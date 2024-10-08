import express from "express";
import { createList, getList } from "../../controllers/list/index.js";

const listRouter = express.Router();

listRouter.get("/:listId", getList);
listRouter.post("/", createList);

export default listRouter;
