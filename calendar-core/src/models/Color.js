import mongoose from "mongoose";
const { Schema, model } = mongoose;

const colorsSchema = Schema(
  {
    name: String,
    code: String,
  },
  {
    versionKey: false,
  }
);

export default model("Color", colorsSchema);
