import { Router } from "express";

import protectRoute from "../middleware/protectroute.js";
import { addPlant, getPlants, deletePlant } from "../controller/plantController.js";
const route = Router();
route.post('/add', protectRoute, addPlant);
route.get('/list', protectRoute, getPlants);
route.delete('/delete/:id', protectRoute, deletePlant);
export default route;