import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { globalErrorHandler } from "./lib/globalErrorHandler";
import cookieParser from "cookie-parser";
const app = express();
import config from "./config";
const port = config.env.port || 3000;

// middleware
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use(globalErrorHandler);
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server running on port:${port}`);
    });
  } catch (error) {
    console.log(`error while running server: `, error);
  }
};

start();
