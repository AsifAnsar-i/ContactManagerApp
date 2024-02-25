import express from "express";
import "dotenv/config";
import contactRoute from "./routes/contactRoute.js";
import userRoute from "./routes/userRoute.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to Mongo"))
  .catch((error) => console.log(error));

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api", contactRoute);
app.use("/api", userRoute);

app.listen(port, (req, res) => {
  console.log(`Connected to Server at port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
