import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "user Register success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const signIn = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not exists",
      });
    }
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET);
    if (
      email == "vellaikarthick24@gmail.com" ||
      email == "madhan01@gmail.com"
    ) {
      return res.status(200).json({
        success: true,
        token: token,
        user: userExists,
        message: "Admin success",
        admin: true,
      });
    }
    return res.status(200).json({
      success: true,
      token: token,
      user: userExists,
      message: "sigIn success",
      admin: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: false,
      message: "user get",
      user: userExists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  console.log("userid for update user", req.params.id);
  console.log("data for update user", req.body);

  try {
    const _id = req.params.id;

    const userExists = await User.findById(_id); //findOne({_id:req.params.id})
    if (!userExists) {
      return res.json({
        success: false,
        message: "User Not exists",
      });
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        userName: req.body.userName,
        // profile: req.body.profile,
        email: req.body.email,
        city: req.body.city,
        postalCode: req.body.postalCode,
        address: req.body.address,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
      },
    });
    return res.json({
      success: true,
      message: "user Update success",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const googleAuth = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      if (email == "vellaikarthick24@gmail.com" || "madhan01@gmail.com") {
        return res.status(200).json({
          success: true,
          token: token,
          user,
          message: "Admin success",
          admin: true,
        });
      }
      return res.cookie("access_token", token, { httpOnly: true }).json({
        success: true,
        message: "Goolge Login Success",
        user: rest,
        token: token,
        admin: false,
      });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = await User.create({
        email: req.body.email,
        userName: req.body.userName,
        // profile: req.body.profile,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      if (email == "vellaikarthick24@gmail.com" || "madhan01@gmail.com") {
        return res.status(200).json({
          success: true,
          token: token,
          user: newUser,
          message: "Admin success",
          admin: true,
        });
      }
      return res.cookie("access_token", token).json({
        success: true,
        message: "google login for new User",
        user: rest,
        token: token,
        admin: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.deleteOne({ email: email });
    return res.status(200).json({
      success: true,
      message: "user deleted",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
