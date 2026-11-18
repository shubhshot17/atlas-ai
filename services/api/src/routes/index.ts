import { Router } from "express";
import { getHealth } from "../controllers/healthController.js";
import { validateTripCreation } from "../controllers/tripController.js";
import { validateBody } from "../middleware/validateBody.js";
import { tripCreationSchema } from "../schemas/tripCreationSchema.js";

const router = Router();

router.get("/health", getHealth);
router.post("/trips", validateBody(tripCreationSchema), validateTripCreation);

export default router;
