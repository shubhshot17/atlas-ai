import { z } from "zod";

const isoDateSchema = z.iso.date({
  error: "Must be a valid date in YYYY-MM-DD format.",
});

export const tripCreationSchema = z.object({
  destination: z.string().trim().min(1, { error: "Destination is required." }),
  startDate: isoDateSchema,
  endDate: isoDateSchema,
  travelers: z.number().int({ error: "Travelers must be a whole number." })
    .min(1, { error: "At least one traveler is required." }),
}).superRefine(({ startDate, endDate }, context) => {
  if (startDate >= endDate) {
    context.addIssue({
      code: "custom",
      path: ["endDate"],
      message: "End date must be after start date.",
    });
  }
});

export type TripCreationInput = z.infer<typeof tripCreationSchema>;
