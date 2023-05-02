import mongoose from "mongoose";

// Define schema for Wallet collection
interface IWallet extends Document {
  owner: mongoose.Types.ObjectId;
  balance: number;
}

const walletSchema = new mongoose.Schema<IWallet>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
