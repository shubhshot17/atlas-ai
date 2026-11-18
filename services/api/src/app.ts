import cors from "cors";
import express from "express";
import { frontendOrigins } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";

const app = express();
const allowedOrigins = new Set(frontendOrigins);

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin !== undefined && allowedOrigins.has(origin));
  },
}));
app.use(express.json());
app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
