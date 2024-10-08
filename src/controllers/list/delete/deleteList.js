import { List } from "../../../models/index.js";

export const deleteList = async (req, res) => {
  try {
    await List.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "List doesn't exist!" });
  }
};
