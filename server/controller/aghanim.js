import Aghanim from '../models/aghanim.js';
import { GetAghanimByHeroName, InsertAghanim, UpdateAghanim } from '../Database.js';

export const getAghanimByHeroName = async(req, res) => {
    try{
        const { heroName } = req.params;
        const aghanim = await GetAghanimByHeroName(heroName);

        if(aghanim.code === 200){
            res.status(200).json(aghanim);
        }
        else{
            res.status(aghanim.code).json({message: aghanim.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

export const insertAghanim = async(req, res) => {
    try{
        const aghanimInfo = req.body;
        const aghanim = new Aghanim(aghanimInfo);
        const isExist = await GetAghanimByHeroName(aghanim.EffectOwner);

        if(isExist.code == 200){
            const result = await UpdateAghanim(aghanim);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: aghanim});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
        else{
            const result = await InsertAghanim(aghanim);
            if(result.code === 200){
                res.status(200).json({message:result.message, data: aghanim});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};