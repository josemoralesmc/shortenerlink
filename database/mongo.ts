import mongoose from "mongoose";
import config from "../src/config/config";
export async function runMongo() {
  try {
    await mongoose.connect(config.URI_MONGO);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.log(error);
  }
}