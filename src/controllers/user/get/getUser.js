import { User } from "../../../models/index.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
