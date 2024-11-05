import { List } from "../../../models/index.js";

export const addItem = async (req, res) => {
  const listId = req.params.listId; // Extract listId from route parameters
  const item = req.body; // Get item data from the request body

  try {
    // Use findByIdAndUpdate to add the item directly to the list
    const updatedList = await List.findByIdAndUpdate(
      listId,
      {
        $push: {
          items: { itemName: item.itemName, completed: item.completed },
        },
      }, // Push the new item into the items array
      { new: true }, // Return the modified document
    )
      .populate({
        path: "author",
      })
      .populate({
        path: "members.user",
      });

    // Check if the list was found and updated
    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    // Return the populated updated list
    res.status(200).json(updatedList);
  } catch (error) {
    console.error("Error adding item:", error); // Log the error
    res
      .status(500)
      .json({ message: "Failed to add item", error: error.message });
  }
};
