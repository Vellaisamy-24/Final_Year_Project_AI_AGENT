import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { travelWorkflow } from "./travelGraph.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware for request validation
const validateRequest = (req, res, next) => {
  const { query, budget, preferences, agentType = "all" } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ success: false, error: "Query must be a non-empty string." });
  }
  if (!["all", "itinerary", "budget", "recommend"].includes(agentType)) {
    return res.status(400).json({ success: false, error: "Invalid agentType. Use 'all', 'itinerary', 'budget', or 'recommend'." });
  }
  req.validated = { query, budget, preferences, agentType };
  next();
};

app.post("/ask", validateRequest, async (req, res) => {
  const { query, budget, preferences, agentType } = req.validated;

  try {
    // Initial state
    const initialState = {
      query,
      budget: budget || null,
      preferences: preferences || null,
      itinerary: null,
      budgetPlan: null,
      recommendations: null,
    };

    // Run the workflow
    const result = await travelWorkflow.invoke(initialState);

    // Filter response based on agentType
    const response = {};
    if (agentType === "all") {
      response.itinerary = result.itinerary;
      response.budgetPlan = result.budgetPlan;
      response.recommendations = result.recommendations;
    } else if (agentType === "itinerary") {
      response.itinerary = result.itinerary;
    } else if (agentType === "budget") {
      response.budgetPlan = result.budgetPlan;
    } else if (agentType === "recommend") {
      response.recommendations = result.recommendations;
    }

    res.json({ success: true, data: response });
    console.log("response " ,response )
  } catch (error) {
    res.status(500).json({ success: false, error: `Error: ${error.message}` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Travel Assistant with LangGraph running on port ${PORT}`));