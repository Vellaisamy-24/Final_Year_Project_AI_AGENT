import { PromptTemplate } from "@langchain/core/prompts";
import { model } from "./utils/model.js";

const budgetPrompt = PromptTemplate.fromTemplate(`
  Act as a Budget Planner. For itinerary "{itinerary}" and budget "{budget}", 
  provide a cost breakdown (Accommodation, Food, Transport, Activities). 
  Suggest cost-saving tips if needed.
`);

export async function budgetNode(state) {
  if (!state.itinerary) throw new Error("Itinerary is required for budgeting.");
  if (!state.budget) return { budgetPlan: "Budget not provided." };
  const formattedPrompt = await budgetPrompt.format({
    itinerary: state.itinerary,
    budget: state.budget,
  });
  const { content } = await model.invoke(formattedPrompt);
  return { budgetPlan: content };
}

export default budgetNode;