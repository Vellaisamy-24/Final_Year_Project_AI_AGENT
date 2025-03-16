import { PromptTemplate } from "@langchain/core/prompts";
import { model } from "./utils/model.js";

const recommendationPrompt = PromptTemplate.fromTemplate(`
  Act as a Travel Recommendation Agent. Based on this input: "{input}" 
  and optional user preferences: "{preferences}", suggest a list of activities, 
  dining options, or destinations. Provide at least 3 specific recommendations 
  with brief descriptions.
`);

export async function recommendationNode(state) {
  if (!state.query) throw new Error("Query is required for recommendations.");
  const formattedPrompt = await recommendationPrompt.format({
    input: state.query,
    preferences: state.preferences || "None provided",
  });
  const { content } = await model.invoke(formattedPrompt);
  return { recommendations: content };
}

export default recommendationNode;