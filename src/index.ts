import express from "express";
import dotenv from "dotenv";
import db from "./db_config";
import auth from "./routes/auth";
import project from "./routes/projects";
import token from "./routes/token";

dotenv.config();

db.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (_, res) => {
  res.status(200).json({message:"groove api running in good health state"})
});
app.use("/api/v1/auth", auth);
app.use("/api/v1/project", project);
app.use("/api/v1/token", token);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
