import { List } from "../../../models/index.js";

export const archiveList = async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { _id: req.params._id },
      req.body.archived,
    );

    // If successful, return the updated list
    res.status(201).json(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create list", error: error.message });
  }
};
