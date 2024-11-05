import { List } from "../../../models/index.js";

export const getCurrentUserLists = async (req, res) => {
  try {
    if (!res.locals.user) {
      res.status(401).json({ message: "User not logged in" });
      return;
    }

    const user = res.locals.user._id;

    const lists = await List.find({
      $or: [
        {
          author: user,
        },
        {
          members: { $elemMatch: { user: user } },
        },
      ],
    })
      .populate({
        path: "author",
      })
      .populate({
        path: "members.user",
      });
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: "Failed to fetch lists" });
  }
};
