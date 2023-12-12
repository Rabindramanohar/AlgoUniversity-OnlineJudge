import asyncHandler from "express-async-handler";
import Problem from "./../models/problemModel.js";

// @desc get list of all problems
// @route GET /api/problems
// @access public
const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find();
  if (problems) {
    res.status(201).send(problems);
  } else {
    res.status(404);
    throw new Error("Failed to retrieve problems");
  }
});

// @desc get problem by id
// @route GET /api/problems/:id
// @access public
const getProblemById = asyncHandler(async (req, res) => {
  const problem_id = req.params.problem_id;
  const problem = await Problem.findById(problem_id);
  console.log("problemID", problem.title);
  if (problem) {
    const { _id, title, description } = problem;
    console.log("Problem checking: ", problem);
    res.status(201).json({ problem });
  } else {
    res.status(404).send("No such problem exists");
    throw new Error(`Problem not found!`);
  }
});

// @desc post new problem
// @route POST /api/problems
// @access private

const createNewProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    inputFormat,
    outputFormat,
    constraints,
    sampleInput,
    sampleOutput,
  } = req.body;
  // console.log("checking res.body: ", req.body);
  const problemExits = await Problem.findOne({ title });
  if (problemExits) {
    // console.log("existing Problem: ", problemExits);
    res.status(400);
    throw new Error(`Problem already exist!!`);
  }

  const problem = await Problem.create({
    title,
    description,
    difficulty,
    inputFormat,
    outputFormat,
    constraints,
    sampleInput,
    sampleOutput,
  });

  if (problem) {
    res.status(201).json({
      _id: problem._id,
      title: problem.title,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid problem data!!`);
  }

  // res.status(200).json({message: 'problem saved!!'})
});

// @desc update problem details TODO(admin only)
// @route PUT /api/problems/:problem_id
// @access private

const updateProblem = asyncHandler(async (req, res) => {
  const problem_id = req.params.problem_id;
  const updatedProblemData = req.body;

  const problem = await Problem.findById(problem_id);
  if (problem) {
    // const {title, description, inputFormat, outputFormat, constraints, sampleInput, sampleOutput} = req.body;
    // Object.assign(problem, updatedProblemData);
    problem.title = updatedProblemData.title || problem.title;
    problem.description = updatedProblemData.description || problem.description;
    problem.difficulty = updatedProblemData.difficulty || problem.difficulty;
    problem.inputFormat = updatedProblemData.inputFormat || problem.inputFormat;
    problem.outputFormat =
      updatedProblemData.outputFormat || problem.outputFormat;
    problem.constraints = updatedProblemData.constraints || problem.constraints;
    problem.sampleInput = updatedProblemData.sampleInput || problem.sampleInput;
    problem.sampleOutput =
      updatedProblemData.sampleOutput || problem.sampleOutput;

    const updatedProblem = await problem.save();
    res.status(201).json({
      message: "problem updated",
      data: updatedProblem,
    });
  } else {
    res.status(404);
    throw new Error(`Problem not found!`);
  }
});

// @desc Delete a problem TODO(admin only)
// @route DELETE /api/problems/:problem_id
// @access private

const deleteProblem = asyncHandler(async (req, res) => {
  const problem_id = req.params.problem_id;
  const problem = await Problem.findByIdAndDelete(problem_id);
  // console.log("delted PROBLEM: ", problem);
  if (problem) {
    res.status(201).json({ message: "problem deleted!", data: problem });
  } else {
    res.status(404);
    throw new Error("Problem not found");
  }
});

export {
  getAllProblems,
  getProblemById,
  createNewProblem,
  updateProblem,
  deleteProblem,
};
