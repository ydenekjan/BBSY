import { User } from "../../../models/index.js";
import { createToken, maxAge } from "../../../helpers/authHelper.js";

export const createUser = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  try {
    const user = new User(req.body);
    // Attempt to save the user to the database
    await user.save();

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });
    res.status(201).json({ user: user._id });
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
