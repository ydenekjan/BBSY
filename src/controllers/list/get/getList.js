import { List } from "../../../models/index.js";

export const getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId)
      .populate({
        path: "author",
      })
      .populate({
        path: "members.user",
      });
    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: "Failed to fetch lists" });
  }
};
