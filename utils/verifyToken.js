import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(404, "Unauthorize"));
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(404, "unauthorize"));
    }
    req.user = user;
    next();
  });
};
