import express from "express";
import {
  getUser,
  createUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
} from "../../controllers/user/index.js";

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);
userRouter.get("/all", getAllUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/", createUser);
userRouter.post("/auth", loginUser);

export default userRouter;
