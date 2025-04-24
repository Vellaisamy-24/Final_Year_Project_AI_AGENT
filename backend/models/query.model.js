import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String, // This will store the response from Mistral AI
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Query = mongoose.model("Query", querySchema);

export default Query;
