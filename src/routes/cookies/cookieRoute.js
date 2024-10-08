import express from "express";
import { readCookies, setCookies } from "../../controllers/cookies/index.js";

const cookiesRouter = express.Router();

cookiesRouter.get("/set", setCookies);
cookiesRouter.get("/read", readCookies);

export default cookiesRouter;
