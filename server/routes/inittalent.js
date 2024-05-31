import express from 'express';
import { getInitTalentByHeroName, insertInitTalent } from '../controller/inittalent.js';

const inittalentRouter = express.Router();

inittalentRouter.get("/getinittalent/:heroName", getInitTalentByHeroName);
inittalentRouter.post("/insert", insertInitTalent);

export default inittalentRouter;