import mongoose from "mongoose";

export const petSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  petType: { type: String, required: true },
});
