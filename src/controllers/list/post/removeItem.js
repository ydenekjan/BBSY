import { List } from "../../../models/index.js";

export const removeItem = async (req, res) => {
  const listId = req.params.listId;
  const itemId = req.query.itemId;

  try {
    // Use findByIdAndUpdate to remove the item directly
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $pull: { items: { _id: itemId } } }, // Use $pull to remove the item
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
    console.error("Error removing item:", error); // Log the error
    res
      .status(500)
      .json({ message: "Failed to remove item", error: error.message });
  }
};
