import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  listName: { type: String, required: true },
  dateCreated: { type: String },
  author: { type: String },
  members: { type: Array },
  items: { type: Array },
});

const List = mongoose.model("List", listSchema);

export default List;
