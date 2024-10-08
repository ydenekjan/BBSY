import express from "express";
import {
  getUser,
  createUser,
  loginUser,
} from "../../controllers/user/index.js";

const userRouter = express.Router();

userRouter.get("/:userId", getUser);
userRouter.post("/", createUser);
userRouter.post("/auth", loginUser);

export default userRouter;
