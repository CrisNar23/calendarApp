import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import dbConnection from "./config/database.js";

import { initialSetup } from "./libs/initialSetup.js";

import eventsRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

//Create a new express server
const app = express();

//Set environment variables
dotenv.config();

//Database connection
dbConnection();

//Create predefined roles
initialSetup();

//Import package.json info
app.set("pkg", pkg);

//Start request monitoring
app.use(morgan("dev"));

//Parse request to JSON
app.use(express.json());

//Route to show app info in the root path
app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
    author: app.get("pkg").author,
  });
});

//Main route to manage events
app.use("/events", eventsRoutes);

//Main route to manage auth
app.use("/auth", authRoutes);

//Main route to manage users
app.use("/users", userRoutes);

//Listening requests into defined port
app.listen(process.env.PORT, () =>
  console.log(
    `Server listening on port: ${process.env.PORT} ->`,
    new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })
  )
);
