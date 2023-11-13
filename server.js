import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
const app = express();
//routers
import jobRouter from "./routes/jobRouter.js";
//import { validateTest } from "./middleware/validationMiddleware.js";
//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

//Morgan is used for logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

/*app.post(
  "/api/v1/test",
  validateTest,
  (req, res) => {
    const { name } = req.body;
    res.json({ message: `hello ${name}`, data: req.body });
  }
);*/

app.use("/api/v1/jobs", jobRouter);

//Not Found Message
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);
//Error Message
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
