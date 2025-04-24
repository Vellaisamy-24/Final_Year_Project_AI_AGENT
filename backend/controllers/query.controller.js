import Query from "../models/query.model.js";
import axios from "axios";
import { travelWorkflow } from "../travelGraph.js";

// Controller for handling travel query via LangGraph workflow
export const handleTravelQuery = async (req, res) => {
  const { query, budget, preferences, agentType = "all" } = req.body;

  try {
    const initialState = {
      query,
      budget: budget || null,
      preferences: preferences || null,
      itinerary: null,
      budgetPlan: null,
      recommendations: null,
    };

    console.log("🚀 Initial State: ", initialState);

    const result = await travelWorkflow.invoke(initialState);

    // Build response based on agentType
    const response = {};
    if (agentType === "all") {
      response.itinerary = result.itinerary;
      response.budgetPlan = result.budgetPlan;
      response.recommendations = result.recommendations;
    } else if (agentType === "itinerary") {
      response.itinerary = result.itinerary;
    } else if (agentType === "budget") {
      response.budgetPlan = result.budgetPlan;
    } else if (agentType === "recommend" || agentType === "recommendation") {
      response.recommendations = result.recommendations;
    }

    console.log("✅ Response sent: ", response);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("❌ Error while processing query: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to ask a query via Mistral API and save response
export const askQuery = async (req, res) => {
  const { userId, query, budget, preferences } = req.body;

  try {
    const mistralRes = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-medium",
        messages: [
          {
            role: "user",
            content: `Plan a trip: ${query}. Budget: ${
              budget || "N/A"
            }. Preferences: ${preferences || "N/A"}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseText = mistralRes.data.choices[0].message.content;

    const savedQuery = await Query.create({
      userId,
      query,
      response: responseText,
    });

    res.status(200).json({ success: true, data: savedQuery });
  } catch (error) {
    console.error("❌ Mistral API or DB error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong while processing your query.",
    });
  }
};

// Controller to get queries for a user (by userId)
export const getQueriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const queries = await Query.find({ userId }).sort({ timestamp: -1 });

    res.status(200).json({ success: true, data: queries });
  } catch (error) {
    console.error("❌ Error fetching queries:", error);
    res.status(500).json({ success: false, error: "Failed to fetch queries." });
  }
};

// Controller to fetch full user query history
export const getUserHistory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📌 Fetching history for user:", id);

    const userHistory = await Query.find({ userId: id });

    if (!userHistory.length) {
      return res.status(404).json({
        success: false,
        message: "User history not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User history fetched successfully.",
      data: userHistory,
    });
  } catch (error) {
    console.error("❌ Error fetching user history:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
