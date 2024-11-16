import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  listName: { type: String, default: "Seznam bez názvu" },
  dateCreated: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: {
    type: [
      {
        itemName: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
      permissions: {
        members: { type: Boolean, default: false }, // Permission for members
        edits: { type: Boolean, default: false }, // Permission for edits
      },
    },
  ],
  archived: { type: Boolean, default: false },
});

const List = mongoose.model("List", listSchema);

export default List;
