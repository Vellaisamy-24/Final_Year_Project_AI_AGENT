import { ChatMistralAI } from "@langchain/mistralai";
import { PromptTemplate } from "@langchain/core/prompts";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool } from "langchain/tools"; // Correct import
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MISTRAL_API_KEY) {
  throw new Error("MISTRAL_API_KEY is missing in .env file.");
}

// Initialize the model
const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  modelName: "mistral-tiny",
});

// Define the budget prompt
const budgetPrompt = PromptTemplate.fromTemplate(`
  Act as a Budget Planner. 
  Based on this itinerary: "{itinerary}" 
  and a budget of "{budget}", provide a detailed cost breakdown for:
  - Accommodation
  - Food
  - Transport
  - Activities
  Suggest cost-effective options if the budget is tight.
`);

// Define the Budget Planning Tool
const budgetPlannerTool = new DynamicTool({
  name: "BudgetPlanner",
  description: "Generates a detailed budget breakdown for travel planning.",
  func: async ({ itinerary, budget }) => {
    const formattedPrompt = await budgetPrompt.format({ itinerary, budget });
    const response = await model.invoke(formattedPrompt);
    return response.content;
  },
});

// Initialize the Agent Executor
const budgetPlannerAgent = await initializeAgentExecutorWithOptions(
  [budgetPlannerTool],
  model,
  {
    agentType: "zero-shot-react-description",
    verbose: true,
  }
);

// Budget Planner Function
export async function planBudget(itinerary, budget) {
  try {
    const response = await budgetPlannerAgent.call({
      input: { itinerary, budget },
    });

    return response.output;
  } catch (error) {
    console.error("Error planning budget:", error);
    throw new Error("Failed to generate budget plan.");
  }
}
