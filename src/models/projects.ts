import mongoose from "mongoose";

// Define schema for Project collection
interface IProject extends Document {
  name: string;
  artist: mongoose.Types.ObjectId;
  targetAmount: number;
  currentAmount: number;
  unitPrice: number;
  totalToken: number;
  createdBy: mongoose.Types.ObjectId;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalToken: {
      type: Number,
      required: true
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
