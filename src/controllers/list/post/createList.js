import { List } from "../../../models/index.js";
import dayjs from "dayjs";

export const createList = async (req, res) => {
  try {
    const list = new List({
      listName: req.body.listName,
      archived: req.body.archived,
      members: req.body.members,
      items: req.body.items,
      dateCreated: dayjs().format(),
      author: res.locals.user._id,
    });

    // Attempt to save the user to the database
    await list.save();

    // If successful, return the created user
    res.status(201).json(list);
  } catch (error) {
    // Check if the error is a validation error
    if (error.name === "ValidationError") {
      // Send a 400 Bad Request response if validation fails
      return res.status(400).json({
        message: "Invalid data",
        errors: error.errors, // This will contain details about which fields failed validation
      });
    }

    // For other types of errors, respond with a 500 Internal Server Error
    res
      .status(500)
      .json({ message: "Failed to create list", error: error.message });
  }
};
