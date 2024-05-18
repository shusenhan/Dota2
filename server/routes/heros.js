import express from "express";
import { insertHero, getHeroByName } from "../controller/heros.js";

const heroRouter = express.Router();

heroRouter.get("/:heroName", getHeroByName);
heroRouter.post("/insert", insertHero);

export default heroRouter;