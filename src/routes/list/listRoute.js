import express from "express";
import {
  archiveList,
  createList,
  getCurrentUserLists,
  getList,
  updateList,
} from "../../controllers/list/index.js";

const listRouter = express.Router();

//GET
listRouter.get("/all", getCurrentUserLists);
listRouter.get("/:listId", getList);

//POST
listRouter.post("/", createList);
listRouter.post("/:listId/edit", updateList);
listRouter.post("/:listId/archive", archiveList);

//DELETE

export default listRouter;
