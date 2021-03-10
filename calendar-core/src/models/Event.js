import mongoose from "mongoose";
const { Schema, model } = mongoose;

//Model to represent an event into the database
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    startHour: {
      type: Date,
      required: true,
    },
    endHour: {
      type: Date,
      required: true,
    },
    dateEvent: {
      type: Date,
      required: true,
    },
    colorLabel: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Event", eventSchema);
