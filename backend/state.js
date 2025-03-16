// state.js
import { Annotation } from "@langchain/langgraph";

// Define the state schema as a plain object
export const TravelState = {
  query: Annotation({
    reducer: (x, y) => y ?? x, // Use latest value, fallback to previous
    default: () => "",         // Default empty string
  }),
  budget: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => null,       // Default null if not provided
  }),
  preferences: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
  itinerary: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
  budgetPlan: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
  recommendations: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
};