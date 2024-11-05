import { getUser } from "./get/getUser.js";
import { createUser } from "./post/createUser.js";
import { loginUser } from "./post/loginUser.js";
import { getCurrentUser } from "./get/getCurrentUser.js";
import { getAllUsers } from "./get/getAllUsers.js";
import logoutUser from "./post/logoutUser.js";

export {
  getUser,
  getCurrentUser,
  getAllUsers,
  createUser,
  loginUser,
  logoutUser,
};
