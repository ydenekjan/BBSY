import express from "express";
import {
  addItem,
  addMember,
  archiveList,
  createList,
  getCurrentUserLists,
  getList,
  removeItem,
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
listRouter.post("/:listId/addItem", addItem);
listRouter.post("/:listId/removeItem", removeItem);
listRouter.post("/:listId/updateItem", updateItem);
listRouter.post("/:listId/archive", archiveList);

//DELETE

export default listRouter;
