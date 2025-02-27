import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateItinerary } from "./aiAgent.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/ask", async (req, res) => {
  const { query } = req.body;
  try {
    const itinerary = await generateItinerary(query);
    res.json({ success: true, data: itinerary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log("🚀 AI Travel Agent running on port 5000"));
