import express from "express";
import { getPlannedDonations, addPlannedDonation, deletePlannedDonation } from "./controller";

const router = express.Router();

router.get("/:userId", getPlannedDonations);
router.post("/", addPlannedDonation);
router.delete("/:id", deletePlannedDonation);

export default router;
