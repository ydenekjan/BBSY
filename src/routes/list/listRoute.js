import express from "express";
import {
  addItem,
  addMember,
  archiveList,
  createList,
  deleteList,
  getCurrentUserLists,
  getList,
  removeCurrentMember,
  removeItem,
  removeMember,
  updateItem,
  updateList,
} from "../../controllers/list/index.js";

const listRouter = express.Router();

//GET
listRouter.get("/all", getCurrentUserLists);
listRouter.get("/:listId", getList);

//POST
listRouter.post("/", createList);
listRouter.post("/:listId/edit", updateList);
listRouter.post("/:listId/addMember", addMember);
listRouter.post("/:listId/removeMember", removeMember);
listRouter.post("/:listId/leave", removeCurrentMember);
listRouter.post("/:listId/addItem", addItem);
listRouter.post("/:listId/removeItem", removeItem);
listRouter.post("/:listId/updateItem", updateItem);
listRouter.post("/:listId/archive", archiveList);

//DELETE
listRouter.delete("/:listId", deleteList);

export default listRouter;
