import Event from "../models/Event.js";

//Check if an event already exist
export const eventValidations = async (req, res, next) => {
  const { startHour, endHour, dateEvent } = req.body;

  try {
    const eventStart = new Date(startHour);
    const eventEnd = new Date(endHour);

    //Check if end date is higher than start date
    if (eventStart.getTime() > eventEnd.getTime())
      return res
        .status(400)
        .json({ message: "The end date must be higher than the start date" });

    //Check if end date is higher than start date
    const addDay = eventStart.setDate(eventStart.getDate() + 1);
    const limitDate = new Date(addDay);
    if (eventEnd.getTime() > limitDate.getTime())
      return res
        .status(400)
        .json({ message: "The event cannot last more than one day" });

    //Check if an event already exist
    const eventFound = await Event.findOne({
      $and: [{ startHour }, { dateEvent }],
    });
    // Range of dates
    // $gte: new Date(new Date(startHour).setHours(00, 00, 00)),
    // $lt: new Date(new Date(endHour).setHours(23, 59, 59)),
    if (eventFound)
      return res.status(400).json({ message: "Event already exist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  next();
};
