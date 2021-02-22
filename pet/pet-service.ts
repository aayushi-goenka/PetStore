import database from "../database-service";
import mongoose from "mongoose";

export const addPetToDatabase = async (petName: string, petType: string) => {
  await (await database())
    .collection("pets")
    .insertOne({ petName: petName, petType: petType });
};

export const getPet = async (id: string) => {
  let pet = await (await database()).collection("pets").findOne({ id: id });
  if (!pet) throw { code: 404, message: "no pet exists with that id" };
  return pet;
};

export const getPets = async () => {
  return await (await database()).collection("pets").find().toArray();
};

export const deletePet = async (id: string) => {
  const pet = await (await database())
    .collection("pet")
    .findOneAndDelete({ id: id });
  if (!pet)
    throw { code: 404, message: "pet does not exist, thus cannot be deleted" };
  return pet;
};
