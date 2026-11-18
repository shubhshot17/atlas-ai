import type { Request, Response } from "express";
import { applicationName } from "../config/env.js";

export const getHealth = (_request: Request, response: Response): void => {
  response.status(200).json({ status: "ok", application: applicationName });
};
