import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import {
  addOwnerToDatabase,
  getOwner,
  getOwners,
  getPetsOfOwner,
} from "./owner-service";

const checkError = async (error: any, res: Response) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ success: false, message: error.message });
  }
  res.status(500).json({ success: false, message: error.message });
};

export const handleAddOwner = async (req: Request, res: Response) => {
  try {
    await addOwnerToDatabase(
      req.body.ownerName,
      req.body.contact,
      req.body.pets
    );
    res.json({ success: true, message: "owner and its pet added" });
  } catch (error) {
    checkError(error, res);
  }
};
export const handleGetOwner = async (req: Request, res: Response) => {
  try {
    const owner = await getOwner(req.params.petName);
    res.status(200).json({ data: owner });
  } catch (error) {
    checkError(error, res);
  }
};

const handleGetOwners = async (req: Request, res: Response) => {
  try {
    const owners = await getOwners();
    res.status(200).json({ data: owners });
  } catch (error) {
    checkError(error, res);
  }
};

export const handleGetPetsOfOwner = async (req: Request, res: Response) => {
  try {
    const owner = await getPetsOfOwner(req.params.petName);
    res.status(200).json({ data: owner });
  } catch (error) {
    checkError(error, res);
  }
};

export const ownerRoute = () => {
  const app = Router();
  app.post("/addOwner", handleAddOwner);
  app.get("/getOwner/:petName", handleGetOwner);
  app.get("/getOwners", handleGetOwners);
  app.get("/getPetOfOwner/:ownerName", handleGetPetsOfOwner);
  return app;
};
