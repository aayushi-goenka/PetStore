import express from "express";
import database from "./database-service";
import { petRoute } from "./pet/pet-controller";

import { config } from "dotenv";
import { ownerRoute } from "./owner/owner-controller";

const app = express();

config();
app.use(express.json());
app.use("/petApi", petRoute());
app.use("/ownerApi", ownerRoute());

database()
  .then(() => {
    app.listen(process.env.PORT_URI!, () => {
      console.log("connection established");
    });
  })
  .catch((err) => {
    console.log(err);
  });
