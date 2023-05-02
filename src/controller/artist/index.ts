import { Request, Response } from "express";
import Artist from "../../models/artist";
import { validationResult } from "express-validator";

// Create a new artist
export const creatArtist = async (req: any, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    const artist = new Artist({
      name,
      createdBy: req.user.sub,
    });
    await artist.save();
    return res.status(201).send(artist);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Get all artists
export const getAllArtist = async (_: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    return res.status(200).send(artists);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Get a single artist by ID
export const getArtistById = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).send({ message: "Artist not found" });
    }
    return res.status(200).send(artist);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Update an artist by ID
export const updateArtist = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!artist) {
      return res.status(404).send({ message: "Artist not found" });
    }
    return res.status(200).send(artist);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

// Delete a artist by ID
export const deleteArtist = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).send({ message: "Artist not found" });
    }
    return res.status(204).send("Successfully deleted");
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};
