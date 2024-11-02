import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  listName: { type: String, default: "Seznam bez názvu" },
  dateCreated: { type: String },
  author: { type: String },
  items: {
    type: [
      {
        itemName: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
  members: {
    type: [String],
    default: [],
  },
  archived: { type: Boolean },
});

const List = mongoose.model("List", listSchema);

export default List;
