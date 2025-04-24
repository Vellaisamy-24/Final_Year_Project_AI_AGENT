import Query from "../models/query.model.js";
import User from "../models/user.model.js";
export const getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email != "vellaikarthick24@gmail.com") {
      return res.status(404).json({
        success: false,
        message: "Email not authurized",
      });
    }
    const user = await User.find();
    return res.status(200).json({
      success: true,
      message: "User list get",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userHistory = await Query.find({ userId: id });
    if (!userHistory) {
      return res.status(400).json({
        success: false,
        message: "User histry not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user history fetched",
      userHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
