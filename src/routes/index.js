import express from "express";
import listRouter from "./list/listRoute.js";
import userRouter from "./user/userRoute.js";
import cookiesRouter from "./cookies/cookieRoute.js";

const router = express.Router();

router.use("/list", listRouter);
router.use("/user", userRouter);
router.use("/cookies", cookiesRouter);

export default router;
