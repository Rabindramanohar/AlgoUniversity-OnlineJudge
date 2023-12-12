import express from "express";
// import { protect } from "../middleware/authMiddleware";

import {
  getAllProblems,
  getProblemById,
  createNewProblem,
  updateProblem,
  deleteProblem,
} from "./../controllers/problemControllers.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Testing route");
});

// Post a problem
router.post("/createNewProblem", createNewProblem);

// GET a List of All Problems
router.get("/getAllProblems", getAllProblems);

// GET Problem Details by ID
router.get("/allProblems/:problem_id", getProblemById);

// TODO make 3 routes createNewProblem, updateProblem, and deleteProblem Admin access only

// Update Problem Details (Admin Only)
router.put("/:problem_id", updateProblem);

// Delete a Problem (Admin Only)
router.delete("/:problem_id", deleteProblem);

export default router;
