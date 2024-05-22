import express from "express";
import { insertSkill, getSkillByName } from "../controller/skills.js";

const skillRouter = express.Router();

skillRouter.get("/getskill/:skillName", getSkillByName);
skillRouter.post("/insert", insertSkill);

export default skillRouter;