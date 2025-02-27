import { ChatMistralAI } from "@langchain/mistralai"; // ✅ Correct import
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import dotenv from "dotenv";

dotenv.config();

// Ensure API key is set
if (!process.env.MISTRAL_API_KEY) {
  throw new Error("MISTRAL_API_KEY is missing in .env file.");
}

// Initialize Mistral AI Model
const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY, // ✅ Correct API key usage
  modelName: "mistral-tiny", // Adjust model as needed (e.g., mistral-7b, mistral-large)
});

// Setup Memory for Context Retention
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory });

// Generate Itinerary Based on User Input
export async function generateItinerary(userInput) {
  try {
    const response = await chain.call({
      input: `Create a travel itinerary with places to visit based on this plan: ${userInput}`,
    });

    return response.response; // ✅ Correct response extraction
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary.");
  }
}
