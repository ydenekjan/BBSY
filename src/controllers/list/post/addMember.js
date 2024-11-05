import { List, User } from "../../../models/index.js";

export const addMember = async (req, res) => {
  const listId = req.params.listId; // List ID passed in the URL
  const { email, permissions } = req.body; // Extract email and permissions from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list and check if the user is already a member
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const existingMember = list.members.find(
      (member) => member.user.toString() === user._id.toString(),
    );

    if (existingMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // Update the list by adding a new member
    const updatedList = await List.findByIdAndUpdate(
      listId,
      {
        $addToSet: {
          // Use $addToSet to add the member
          members: {
            user: user._id,
            permissions: {
              members: permissions.members || false,
              edits: permissions.edits || false,
            },
          },
        },
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
    console.error("Error adding member:", error); // Log the error
    res
      .status(500)
      .json({ message: "Failed to update members", error: error.message });
  }
};
