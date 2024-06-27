import Talent from "../models/talent.js";
import { GetTalentByHeroName, InsertTalent, UpdateTalent } from "../Database.js";

export const getTalentByHeroName = async(req, res) => {
    try{
        const { heroName } = req.params;
        const talent = await GetTalentByHeroName(heroName);

        if(talent.code === 200){
            res.status(200).json(talent);
        }
        else{
            res.status(talent.code).json({message: talent.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const insertTalent = async(req, res) => {
    try{
        const talentInfo = req.body;
        const talent = new Talent(talentInfo);
        const isExist = await GetTalentByHeroName(talent.TalentOwner);

        if(isExist.code == 200){
            const result = await UpdateTalent(talent);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: talent});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
        else{
            const result = await InsertTalent(talent);
            if(result.code === 200){
                res.status(200).json({message:result.message, data: talent});
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