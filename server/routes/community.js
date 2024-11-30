import express from "express";
import { 
    insertCommunity, 
    getVisableCommuniteis, 
    getCommunityById, 
    getCommunityAdmin 
} from "../controller/community.js";

const communityRouter = express.Router();

communityRouter.post("/create", insertCommunity);
communityRouter.get("/visableCommunities", getVisableCommuniteis);
communityRouter.get('/communityById/:communityId', getCommunityById);
communityRouter.get('/communityAdmin/:communityId', getCommunityAdmin);

export default communityRouter;