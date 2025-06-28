import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { globalErrorHandler } from "./lib/globalErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";

const app = express();
const port = config.env.port || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use(globalErrorHandler);

// Start server
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  } catch (error) {
    console.log(`error while running server: `, error);
  }
};

start();
