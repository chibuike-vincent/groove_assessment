import mongoose from "mongoose";

// Define schema for Token collection
interface IToken extends Document {
  investor: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  totalUserToken: number;
}

const tokenSchema = new mongoose.Schema<IToken>(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalUserToken: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
