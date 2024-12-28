import express from "express";
import { insertHero, getHeroByName, getAllHeroName, getHero3DModelFile } from "../controller/heros.js";

const heroRouter = express.Router();

heroRouter.get("/gethero/:heroName", getHeroByName);
heroRouter.post("/insert", insertHero);
heroRouter.get('/getallheroname', getAllHeroName);
heroRouter.get('/getHeroFile/:heroName', getHero3DModelFile)

export default heroRouter;