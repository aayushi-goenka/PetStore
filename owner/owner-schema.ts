import mongoose from "mongoose";
import { petSchema } from "../pet/pet-schema";

export const ownerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  petsOwned: [petSchema],
});
