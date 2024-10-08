import { List } from "../../../models/index.js"; // Adjust as necessary

export const createList = async (req, res) => {
  try {
    const list = new List(req.body);

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
      .json({ message: "Failed to create user", error: error.message });
  }
};
