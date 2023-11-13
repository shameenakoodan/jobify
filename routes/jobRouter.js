import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
} from "../controllers/jobController.js";

import { validateJobInput,validateIdParam} from "../middleware/validationMiddleware.js";
router.route('/').get(getAllJobs).post(validateJobInput, createJob)
router.route('/:id').get(validateIdParam,getJob).patch(validateJobInput,validateIdParam,editJob).delete(validateIdParam,deleteJob);

export default router;