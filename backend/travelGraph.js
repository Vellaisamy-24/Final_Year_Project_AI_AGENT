import { StateGraph } from "@langchain/langgraph";
import { itineraryNode } from "./aiAgent.js";
import { budgetNode } from "./budgetPlannerAgent.js";
import { recommendationNode } from "./recommendationAgent.js";
import { TravelState } from "./state.js";

// Define the graph with unique node names
const graph = new StateGraph(TravelState)
  .addNode("itineraryNode", itineraryNode)         // Unique name
  .addNode("budgetNode", budgetNode)               // Unique name
  .addNode("recommendationNode", recommendationNode) // Unique name
  .addEdge("itineraryNode", "budgetNode")          // Updated edge
  .addEdge("itineraryNode", "recommendationNode")  // Updated edge
  .setEntryPoint("itineraryNode");                 // Updated entry point

// Compile the graph
export const travelWorkflow = graph.compile();