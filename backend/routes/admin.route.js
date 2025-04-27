import express from "express";

import { getUser, getUserHistory } from "../controllers/admin.controller.js";
import { getSingleUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/getUser", getUser);
router.post("/getUserHistory/:id", getUserHistory);
router.post("/getSingleUser", getSingleUser);
// router.get("/queries/:userId", getQueriesByUserId);

export default router;
