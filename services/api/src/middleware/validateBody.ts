import type { RequestHandler } from "express";
import type { z } from "zod";
import { RequestValidationError } from "../errors/RequestValidationError.js";

export const validateBody = <Schema extends z.ZodType>(schema: Schema): RequestHandler =>
  (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      next(new RequestValidationError(result.error.issues.map((issue) => ({
        field: issue.path.length > 0 ? issue.path.join(".") : "body",
        message: issue.message,
      }))));
      return;
    }

    request.body = result.data;
    next();
  };
