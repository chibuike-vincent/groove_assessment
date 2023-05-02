import { Request, Response } from "express";
import Project from "../../models/projects";
import { validationResult } from "express-validator";

// Create a new project
export const creatProject = async (req: any, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, artist, targetAmount, unitPrice } = req.body;
    let totalT = Number(targetAmount) / Number(unitPrice)
    const project = new Project({
      name,
      artist,
      targetAmount,
      unitPrice,
      totalToken: totalT,
      createdBy: req.user.sub,
    });
    await project.save();
    return res.status(201).send(project);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Get all projects
export const getAllProjects = async (_: Request, res: Response) => {
  try {
    const projects = await Project.find();
    return res.status(200).send(projects);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    return res.status(200).send(project);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Update a project by ID
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, description, artist, targetAmount } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, artist, targetAmount },
      { new: true }
    );
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    return res.status(200).send(project);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Delete a project by ID
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    return res.status(204).send(project);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};
