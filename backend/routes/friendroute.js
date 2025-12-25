import { Router } from "express";
import protectRoute from "../middleware/protectroute.js";
import { addFriend,getFriends,getRequest,comepeteFriend} from "../controller/friendsController.js";

const route = Router();

route.post('/addfriend/:id',protectRoute,addFriend);
route.get('/friendslist',protectRoute,getFriends);
route.get('/requests',protectRoute,getRequest);
route.get('comepete/:id',protectRoute,comepeteFriend);
// route.post('/send-request',protectRoute,sendRequest);
// route.post('/rejectrequest',protectRoute,rejectrequest);    
export default route;