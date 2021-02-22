import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { addPetToDatabase, getPet, getPets, deletePet } from "./pet-service";

const checkError = async (error: any, res: Response) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ success: false, message: error.message });
  }
  res.status(500).json({ success: false, message: error.message });
};

export const handleAddPet = async (req: Request, res: Response) => {
  try {
    await addPetToDatabase(req.body.petName, req.body.petType);
    res.json({ success: true, message: "pet and its type added" });
  } catch (error) {
    checkError(error, res);
  }
};

export const handleGetPet = async (req: Request, res: Response) => {
  try {
    const pet = await getPet(req.params.id);
    res.status(200).json({ data: pet });
  } catch (error) {
    checkError(error, res);
  }
};

const handleGetPets = async (req: Request, res: Response) => {
  try {
    const pets = await getPets();
    res.status(200).json({ data: pets });
  } catch (error) {
    checkError(error, res);
  }
};

const handleDeletePet = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    await deletePet(_id);
    res.json({ success: true, message: "pet deleted" });
  } catch (error) {
    if (error.code) {
      return res
        .status(error.code)
        .send({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const petRoute = () => {
  const app = Router();
  app.post("/addPet", handleAddPet);
  app.get("/getPet/:_id", handleGetPet);
  app.post("/deletePet/:_id", handleDeletePet);
  app.get("/getPets", handleGetPets);
  return app;
};
