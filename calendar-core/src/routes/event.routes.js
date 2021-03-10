import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
} from "../controllers/event.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import { eventValidations } from "../middlewares/eventValidations.js";

const router = Router();

//Route to create a new event only for logged admin users
router.post("/", [verifyToken, isAdmin, eventValidations], createEvent);

//Route to get a list of events
router.get("/", getEvents);

//Route to get an event by ID
router.get("/:eventId", getEventById);

//Route to update an event by ID
router.put("/:eventId", verifyToken, eventValidations, updateEventById);

//Route to delete an event by ID
router.delete("/:eventId", [verifyToken, isAdmin], deleteEventById);

export default router;
