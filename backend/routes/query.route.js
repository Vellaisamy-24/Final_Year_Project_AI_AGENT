import express from "express";
import {
  askQuery,
  getQueriesByUserId,
  getUserHistory,
  handleTravelQuery,
  
} from "../controllers/query.controller.js";


const router = express.Router();

router.post("/ask", askQuery);
router.post("/getUserHistory", getUserHistory);
router.get("/queries/:userId", getQueriesByUserId);

router.post("/run-agent", handleTravelQuery);
export default router;
