import database from "../database-service";
import mongoose from "mongoose";

export const addOwnerToDatabase = async (
  ownerName: string,
  contact: string,
  pets: string[]
) => {
  await (await database())
    .collection("owners")
    .insertOne({ ownerName: ownerName, contact: contact, pets: pets });
};

export const getOwner = async (petName: string) => {
  let owner = await (await database())
    .collection("owners")
    .findOne(
      { "pets.petName": petName },
      { projection: { _id: 0, ownerName: 1 } }
    );
  if (!owner) throw { code: 404, message: "no owner exists with that pet" };
  return owner;
};

export const getOwners = async () => {
  return await (await database())
    .collection("owners")
    .find({}, { projection: { _id: 0, ownerName: 1 } })
    .toArray();
};

export const getPetsOfOwner = async (ownerName: string) => {
  let owner = await (await database())
    .collection("owners")
    .find({ ownerName: ownerName }, { projection: { _id: 0, pets: 1 } })
    .toArray();
  if (!owner) throw { code: 404, message: "no pets exists with that owner" };
  return owner;
};
