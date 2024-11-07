import { List, User } from "../../../models/index.js";

export const removeCurrentMember = async (req, res) => {
  const listId = req.params.listId; // List ID passed in the URL
  const currentUser = res.locals.user; // Get the current user from res.locals

  try {
    // Ensure that the current user exists
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the list and check if it exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Check if the current user is a member of the list
    const existingMemberIndex = list.members.findIndex(
      (member) => member.user.toString() === currentUser._id.toString(),
    );

    if (existingMemberIndex === -1) {
      return res.status(400).json({ message: "User is not a member" });
    }

    // Remove the member from the list using findOneAndUpdate
    const updatedList = await List.findOneAndUpdate(
      { _id: listId },
      {
        $pull: { members: { user: currentUser._id } }, // Use $pull to remove the member
      },
      { new: true, runValidators: true }, // Return the modified document and run validators
    )
      .populate({
        path: "author",
      })
      .populate({
        path: "members.user",
      });

    // Return the populated updated list
    res.status(200).json(updatedList);
  } catch (error) {
    console.error("Error removing member:", error); // Log the error
    res
      .status(500)
      .json({ message: "Failed to remove member", error: error.message });
  }
};
