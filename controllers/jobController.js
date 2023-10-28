import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
let jobs = [
  { id: nanoid(), company: "apple", position: "front end" },
  { id: nanoid(), company: "google", position: "back end" },
];

//Get all Jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

//Create a job
export const createJob = async (req, res) => {
  const { company, position } = req.body;

  const job = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({ job });
};

//Get a single job
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

//Update Job
export const editJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ job: updatedJob });
};
//Delete a Job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ job: removedJob });
};
