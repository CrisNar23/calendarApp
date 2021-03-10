import City from "../models/City.js";
import Color from "../models/Color.js";
import Role from "../models/Role.js";

//Create predefined info when starting the application
export const initialSetup = async () => {
  try {
    const rolesCount = await Role.estimatedDocumentCount();
    const colorsCount = await Color.estimatedDocumentCount();
    const citiesCount = await City.estimatedDocumentCount();

    if (rolesCount === 0)
      await Promise.all([
        new Role({ name: "admin" }).save(),
        new Role({ name: "standard" }).save(),
      ]);

    if (colorsCount === 0)
      await Promise.all([
        new Color({ name: "Red", code: "#FF0000" }).save(),
        new Color({ name: "Yellow", code: "#FFFF00" }).save(),
        new Color({ name: "Blue", code: "#0000FF" }).save(),
      ]);

    if (citiesCount === 0)
      await Promise.all([
        new City({ name: "Bogotá" }).save(),
        new City({ name: "Pasto" }).save(),
      ]);
  } catch (error) {
    console.error(error);
  }
};
