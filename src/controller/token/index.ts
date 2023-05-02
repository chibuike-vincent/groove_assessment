import { Request, Response } from "express";
import Token from "../../models/tokens";
import Project from "../../models/projects";
import { ObjectId } from "mongodb";
import { validationResult } from "express-validator";
import Wallet from "../../models/wallet";
import mongoose from "mongoose";

// Get all tokens
export const getAllProjectToken = async (req: Request, res: Response) => {
  try {
    const tokens = await Token.find({ project: req.params.projectId });
    return res.json(tokens);
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};

export const getAllUserToken = async (req: any, res: Response) => {
  try {
    const tokens = await Token.find({ investor: req.user.sub });
    return res.json(tokens);
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};

// Get token by ID
export const getTokenById = async (req: Request, res: Response) => {
  try {
    const tokenId = req.params.tokenId;
    const token = await Token.findOne({ _id: new ObjectId(tokenId) });
    if (!token) {
      return res.status(404).json({message: "Token not found"});
    } else {
      return res.json(token);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Buy token
export const buyToken = async (req: any, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if(project.totalToken < req.body.amount){
      return res.status(302).json({ message: `Number od available token is ${project.totalToken}` });
    }

    const wallet:any = await Wallet.findOne({owner: new mongoose.Types.ObjectId(req.user.sub)})

    const saleAmount = Number(req.body.amount) * Number(project.unitPrice)

    if(wallet.balance < saleAmount){
      return res.status(400).json({ message: "Insufficient wallet balance!" });
    }

    const existingToken = await Token.findOne({project:projectId})
    if(existingToken){
      existingToken.totalUserToken += req.body.amount
      wallet.balance -= saleAmount
      project.totalToken -= Number(req.body.amount)
      project.currentAmount += Number(req.body.amount) * Number(project.unitPrice)
      await wallet.save()
      await existingToken.save()
      await project.save()
  
      // Return success response
      return res.status(201).json(existingToken);
    }else {
      // Create new token for project
    const token = new Token({
      project: project._id,
      totalUserToken: req.body.amount,
      investor: req.user.sub,
    });

    // Save token to database
    await token.save();
    project.totalToken -= Number(req.body.amount)
    project.currentAmount += Number(req.body.amount) * Number(project.unitPrice)
    wallet.balance -= saleAmount
    await project.save()
    await wallet.save()

    // Return success response
    return res.status(201).json(token);
    }
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Internal Server Error");
  }
};

// Sell token
export const sellToken = async (req: any, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId, tokenId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Retrieve token by ID
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    // Check if authenticated user owns the token
    if (token.investor.toString() !== req.user.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }

     // Check if user has enough token
     if (token.totalUserToken < req.body.amount) {
      return res.status(302).json({ message: "Insuffucient Token!" });
    }

    // Calculate sale amount based on token amount and unit price
    const saleAmount = Number(req.body.amount) * Number(project.unitPrice);

    const wallet:any = await Wallet.findOne({owner: new mongoose.Types.ObjectId(req.user.sub)})

    // Update token and project
    token.totalUserToken -= req.body.amount;
    project.totalToken += req.body.amount
    project.currentAmount -= saleAmount;
    wallet.balance += saleAmount
    await token.save();
    await project.save();
    await wallet.save()

    // Return success response
    return res.json(token);
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Internal Server Error");
  }
};
