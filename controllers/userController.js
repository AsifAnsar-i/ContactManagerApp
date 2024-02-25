import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const registerController = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(404, "All field required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(404, "All field required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "password is not valid"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(201)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteConnector = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(404, "U are not allowed to delete"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json("User Deleted");
  } catch (error) {
    next(error);
  }
};

export const userController = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};
