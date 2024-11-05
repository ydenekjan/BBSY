import { List, User } from "../../../models/index.js";

export const removeMember = async (req, res) => {
  const listId = req.params.listId; // List ID passed in the URL
  const { email } = req.body; // Extract email from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list and check if it exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Check if the user is a member of the list
    const existingMemberIndex = list.members.findIndex(
      (member) => member.user.toString() === user._id.toString(),
    );

    if (existingMemberIndex === -1) {
      return res.status(400).json({ message: "User is not a member" });
    }

    // Remove the member from the list using findOneAndUpdate
    const updatedList = await List.findOneAndUpdate(
      { _id: listId },
      {
        $pull: { members: { user: user._id } }, // Use $pull to remove the member
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
