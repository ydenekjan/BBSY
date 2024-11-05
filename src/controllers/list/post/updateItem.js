import { List } from "../../../models/index.js";
import mongoose from "mongoose";

export const updateItem = async (req, res) => {
  const listId = req.params.listId; // Extract listId from route parameters
  const itemId = req.query.id; // Extract itemId from query parameters

  const itemUpdates = req.body; // Extract updated item data from request body

  console.log("Updating List ID:", listId);
  console.log("Item ID:", itemId);
  console.log("Item Updates:", itemUpdates);

  try {
    // Validate ObjectId format
    if (
      !mongoose.Types.ObjectId.isValid(listId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    ) {
      return res.status(400).json({ message: "Invalid list or item ID." });
    }

    // Find the list and update the specific item in the list
    const updatedList = await List.findByIdAndUpdate(
      listId,
      {
        $set: {
          "items.$[elem].itemName": itemUpdates.itemName,
          "items.$[elem].completed": itemUpdates.completed,
        },
      },
      {
        new: true,
        runValidators: true, // Ensure that validators are run
        arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(itemId) }], // Use 'new' to instantiate ObjectId
      },
    )
      .populate("author") // Populate the author field if necessary
      .populate("members.user"); // Populate member users if necessary

    // Check if the list was found and updated
    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    // Log the updated list for debugging
    console.log("Updated List:", updatedList);

    // Return the populated updated list
    res.status(200).json(updatedList);
  } catch (error) {
    console.error("Error updating item:", error); // Log the error
    res
      .status(500)
      .json({ message: "Failed to update item", error: error.message });
  }
};
