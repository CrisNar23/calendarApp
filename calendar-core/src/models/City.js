import mongoose from "mongoose";
const { Schema, model } = mongoose;

const citiesSchema = Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("City", citiesSchema);
