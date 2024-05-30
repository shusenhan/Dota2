import express from "express";
import { getAghanimByHeroName, insertAghanim } from '../controller/aghanim.js';

const aghanimRouter = express.Router();

aghanimRouter.get("/getaghanim/:heroName", getAghanimByHeroName);
aghanimRouter.post("/insert", insertAghanim);

export default aghanimRouter;