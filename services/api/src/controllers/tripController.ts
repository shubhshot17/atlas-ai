import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { TripCreationInput } from "../schemas/tripCreationSchema.js";

export const validateTripCreation: RequestHandler<
  ParamsDictionary,
  unknown,
  TripCreationInput
> = (request, response) => {
  response.status(200).json({
    status: "valid",
    trip: request.body,
  });
};
