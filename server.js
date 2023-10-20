import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import morgan from "morgan";

import { nanoid } from "nanoid";
let jobs = [
  { id: nanoid(), company: "apple", position: "front end" },
  { id: nanoid(), company: "google", position: "back end" },
];
const app = express();

//Morgan is used for logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data recieved", data: req.body });
});

//Get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

//Get single job
app.get("/api/v1/jobs/:id", (req, res) => {
  const {id} = req.params;
  const job = jobs.find((job)=>job.id === id)
  if(!job){
    return res.status(404).json({msg:'no job with id'});
  }
  res.status(200).json({job});
});
//Edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
    const {company,position} = req.body;
    if (!company || !position) {
      return res.status(400).json({ msg: "please provide company and position" });
    }
    const {id} = req.params;
    const job = jobs.find((job)=>job.id === id)
    if(!job){
      return res.status(404).json({msg:'no job with id'});
    }
    job.company = company;
    job.position = position
    res.status(200).json({msg : 'job modified', job});
  });
const port = process.env.PORT || 5100;

app.listen(5100, () => {
  console.log("Server is running...");
});
