import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateItinerary } from "./aiAgent.js";
import { planBudget } from "./budgetPlannerAgent.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/ask", async (req, res) => {
  const { query, budget, agentType = "both" } = req.body; // Default to "both"

  if (!query || typeof query !== "string") {
    return res.status(400).json({ success: false, error: "Invalid query input." });
  }

  try {
    let response = {};

    if (agentType === "travel") {
      response.itinerary = await generateItinerary(query);
    } 
    else if (agentType === "budget") {
      response.budgetPlan = await planBudget(query, budget);
    } 
    else if (agentType === "both") {
      const itinerary = await generateItinerary(query);
      const budgetPlan = budget ? await planBudget(itinerary, budget) : "Budget not provided.";
      response = { itinerary, budgetPlan };
    } 
    else {
      return res.status(400).json({ success: false, error: "Invalid agent type. Use 'travel', 'budget', or 'both'." });
    }

    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error: ${error.message}` });
  }
});

app.listen(5000, () => console.log("🚀 Multi-Agent AI Travel Assistant running on port 5000"));
