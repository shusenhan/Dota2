import express from "express";
import { insertSkill, getSkillByName, getSkillByHeroName, getAllSkills, getAllItemSkills } from "../controller/skills.js";

const skillRouter = express.Router();

skillRouter.get("/getskill/:skillName", getSkillByName);
skillRouter.post("/insert", insertSkill);
skillRouter.get("/getheroskill/:heroName", getSkillByHeroName);
skillRouter.get("/allskill", getAllSkills);
skillRouter.get('/allitemskill', getAllItemSkills);

export default skillRouter;