import { ChatMistralAI } from "@langchain/mistralai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate API key
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
if (!MISTRAL_API_KEY) {
  throw new Error("MISTRAL_API_KEY is missing in .env file. Please provide a valid API key.");
}

// Define model name explicitly for logging
const modelName = process.env.MODEL_NAME || "mistral-tiny";

// Initialize the Mistral AI model
export const model = new ChatMistralAI({
  apiKey: MISTRAL_API_KEY,
  modelName: modelName, // Use the variable here
  temperature: parseFloat(process.env.TEMPERATURE) || 0.7,
  cache: process.env.NODE_ENV !== "development",
  maxRetries: 3,
  timeout: 10000,
});

// Log model initialization in development
if (process.env.NODE_ENV === "development") {
  console.log(`Mistral AI model initialized: ${modelName}`);
}