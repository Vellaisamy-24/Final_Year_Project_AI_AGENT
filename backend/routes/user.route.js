import express from "express";
import {
  deleteUser,
  getSingleUser,
  googleAuth,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);
router.route("/getSingleUser").post(getSingleUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/googleLogin").post(googleAuth);
router.route("/deleteUser").delete(deleteUser);

export default router;
