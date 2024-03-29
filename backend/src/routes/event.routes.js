import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addEvent, getEvent, showEvents } from "../controllers/event.controller.js";

const eventRouter = Router()

// private routes
eventRouter.route("/addEvent").post(verifyJWT,addEvent)

eventRouter.route("/showEvents").get(showEvents)

eventRouter.route("/e/:eventId").get(getEvent)

export default eventRouter;