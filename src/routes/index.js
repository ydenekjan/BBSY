import express from "express";
import listRouter from "./list/listRoute.js";
import userRouter from "./user/userRoute.js";
import { checkUser } from "../helpers/authHelper.js";

const router = express.Router();

router.use("*", checkUser);

router.use("/lists", listRouter);
router.use("/users", userRouter);

export default router;
