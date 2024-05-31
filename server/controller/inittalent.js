import InitTalent from '../models/inittalent.js';
import { GetInitTalentByHeroName, UpdateInitTalent, InsertInitTalent, GetInitTalentByName} from '../Database.js';

export const getInitTalentByHeroName = async(req, res) => {
    try{
        const { heroName } = req.params;
        const inittalent = await GetInitTalentByHeroName(heroName);

        if(inittalent.code === 200){
            res.status(200).json(inittalent);
        }
        else{
            res.status(inittalent.code).json({message: inittalent.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const insertInitTalent = async(req, res) => {
    try{
        const initTalentInfo = req.body;
        const initTalent = new InitTalent(initTalentInfo);
        const isExist = await GetInitTalentByName(initTalent.InitTalentCNName);

        if(isExist.code == 200){
            const result = await UpdateInitTalent(initTalent);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: initTalent});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
        else{
            const result = await InsertInitTalent(initTalent);
            if(result.code === 200){
                res.status(200).json({message:result.message, data: initTalent});
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