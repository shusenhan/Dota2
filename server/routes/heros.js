import express from "express";
import { insertHero, getHeroByName, getAllHeroName } from "../controller/heros.js";

const heroRouter = express.Router();

heroRouter.get("/gethero/:heroName", getHeroByName);
heroRouter.post("/insert", insertHero);
heroRouter.get('/getallheroname', getAllHeroName);

export default heroRouter;