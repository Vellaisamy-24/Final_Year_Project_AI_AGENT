import express from "express";
import {
  getSingleUser,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);
router.route("/getSingleUser").post(getSingleUser);
router.route("/updateUser/:id").put(updateUser);
export default router;
