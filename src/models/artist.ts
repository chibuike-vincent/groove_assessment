import mongoose from "mongoose";

// Define schema for Project collection
interface IArtist extends Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
}

const artistSchema = new mongoose.Schema<IArtist>(
  {
    name: {
      type: String,
      required: true,
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

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
