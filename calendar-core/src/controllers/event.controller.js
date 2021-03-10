import City from "../models/City.js";
import Event from "../models/Event.js";
import Color from "../models/Color.js";

//Function to create new events
export const createEvent = async (req, res) => {
  const {
    title,
    description,
    city,
    startHour,
    endHour,
    dateEvent,
    colorLabel,
  } = req.body;

  try {
    let newCity,
      newColor = "";

    if (city) {
      const foundCity = await City.findOne({ name: city });
      newCity = foundCity._id;
    } else {
      const defaultCity = await City.findOne({ name: "Bogotá" });
      newCity = [defaultCity._id];
    }

    if (colorLabel) {
      const foundColor = await Color.findOne({ name: colorLabel });
      newColor = foundColor._id;
    } else {
      const defaultColor = await Color.findOne({ name: "Red" });
      newColor = [defaultColor._id];
    }

    const newEvent = new Event({
      title,
      description,
      city: newCity,
      startHour,
      endHour,
      dateEvent,
      colorLabel: newColor,
    });

    const eventSaved = await newEvent.save();
    res.status(201).json(eventSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to get a list of events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({ path: "city", select: "name -_id" })
      .populate({ path: "colorLabel", select: "name code -_id" });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to get an event by ID
export const getEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId)
      .populate({ path: "city", select: "name -_id" })
      .populate({ path: "colorLabel", select: "name code -_id" });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to update an event by ID
export const updateEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    })
      .populate({ path: "city", select: "name -_id" })
      .populate({ path: "colorLabel", select: "name code -_id" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to delete an event by ID
export const deleteEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    await Event.findByIdAndDelete(eventId);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
