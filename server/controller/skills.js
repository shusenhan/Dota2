import Skill from '../models/skill.js';
import { GetSkillByName, InsertSkill, UpdateSkill, GetSkillByHeroName, GetAllItemSkills, GetAllSkills } from '../Database.js';

export const getSkillByName = async(req, res) => {
    try{
        const { SkillName } = req.params;
        const skill = await GetSkillByName(SkillName);

        if(skill.code === 200){
            res.status(200).json(skill);
        }
        else{
            res.status(skill.code).json({message: skill.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const insertSkill = async(req, res) => {
    try{
        const skillInfo = req.body;
        const skill = new Skill(skillInfo);
        const isExist = await GetSkillByName(skill.SkillName);

        if(isExist.code == 200){
            const result = await UpdateSkill(skill);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: skill});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
        else{
            const result = await InsertSkill(skill);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: skill});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getSkillByHeroName = async(req, res) => {
    try{
        const {heroName} = req.params;
        const skills = await GetSkillByHeroName(heroName);

        if(skills.code === 200){
            res.status(200).json(skills);
        }
        else{
            res.status(skills.code).json({message: skills.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getAllItemSkills = async(req, res) => {
    try{
        const skills = await GetAllItemSkills();

        if(skills.code === 200){
            res.status(200).json(skills);
        }
        else{
            res.status(skills.code).json({message: skills.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getAllSkills = async(req, res) => {
    try{
        const skills = await GetAllSkills();

        if(skills.code === 200){
            res.status(200).json(skills);
        }
        else{
            res.status(skills.code).json({message: skills.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}