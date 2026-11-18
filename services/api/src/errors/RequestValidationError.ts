import { ApiError } from "./ApiError.js";

export interface FieldValidationIssue {
  field: string;
  message: string;
}

export class RequestValidationError extends ApiError {
  constructor(public readonly issues: FieldValidationIssue[]) {
    super(400, "VALIDATION_ERROR", "Request validation failed.");
  }
}
