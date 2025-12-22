import { Router } from "express";
import protectRoute from "../middleware/protectroute.js";
import { getinfo } from "../controller/homeroutecontroller.js";
const route = Router();

route.get('/home',protectRoute,getinfo);

export default route;