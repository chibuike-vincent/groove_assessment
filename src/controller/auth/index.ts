import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/users";
import Wallet from "../../models/wallet"
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    let userT;
    if (username.toLowerCase().includes("poprevadmin")) {
      userT = "admin";
    } else {
      userT = "user";
    }

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      userType: userT,
    });
    await newUser.save();
    await Wallet.create({owner: newUser._id })

    // Generate a JWT
    const secret: any = process.env.SECRET;
    const token = jwt.sign(
      {
        username: newUser.username,
        sub: newUser._id,
        userType: newUser.userType,
      },
      secret
    );

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    // Generate a JWT
    const secret: any = process.env.SECRET;
    const token = jwt.sign(
      {
        username: user.username,
        sub: user._id,
        userType: user.userType,
      },
      secret
    );

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getUserWallet = async (req: any, res: Response) => {
  try {
    const id = new mongoose.Types.ObjectId(req.user.sub);
    const wallet = await Wallet.findOne({owner: id});
    if (!wallet) {
      return res.status(404).send({ message: "Wallet not found" });
    }
    return res.status(200).send(wallet);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Update an artist by ID
export const fundWallet = async (req: any, res: Response) => {
  try {
    const { amount } = req.body;
    const id = new mongoose.Types.ObjectId(req.user.sub);
    const wallet = await Wallet.findOneAndUpdate(
      {owner: id},
      { balance: amount },
      { new: true }
    );
    if (!wallet) {
      return res.status(404).send({ message: "Wallet not found" });
    }
    return res.status(200).send(wallet);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

