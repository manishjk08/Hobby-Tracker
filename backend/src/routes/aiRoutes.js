import express from "express";
import {
  getSuggestions,
  getInsights,
  parseHabitInput,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/suggestions", getSuggestions);
router.post("/insights", getInsights);
router.post("/parse", parseHabitInput);

export default router;