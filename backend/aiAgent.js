import { model } from "./utils/model.js";

export async function itineraryNode(state) {
  if (!state.query) throw new Error("Query is required.");
  const prompt = `Create a travel itinerary with places to visit based on this plan: ${state.query}`;
  const { content } = await model.invoke(prompt);
  return { itinerary: content };
}

export default itineraryNode;