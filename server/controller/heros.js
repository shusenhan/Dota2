import Hero from '../models/hero.js';
import { GetHeroByName, InsertHero, UpdateHero, GetAllHeroName } from '../Database.js';
import path from "path";
import { promises as fs } from 'fs';
import { fileURLToPath } from "url";

export const getHeroByName = async(req, res) => {
    try{
        const { heroName } = req.params;
        const hero = await GetHeroByName(heroName);

        if(hero.code === 200){
            res.status(200).json(hero);
        }
        else{
            res.status(hero.code).json({message: hero.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const insertHero = async(req, res) => {
    try{
        const heroInfo = req.body;
        const hero = new Hero(heroInfo);
        const isExist = await GetHeroByName(hero.HeroName);

        if(isExist.code == 200){
            const result = await UpdateHero(hero);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: hero});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
        else{
            const result = await InsertHero(hero);
            if(result.code === 200){
                res.status(200).json({message:result.message, data: hero});
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

export const getAllHeroName = async(req, res) => {
    try{
        const result = await GetAllHeroName();

        if(result.code === 200){
            res.status(200).json(result.data);
        }
        else{
            res.status(result.code).json(result.message);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getHero3DModelFile = async(req, res) => {
    try{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const {heroName} = req.params;
        const dirPath = path.join(__dirname, '../', 'public', 'assets', 'models', 'heroes', heroName.toLowerCase());

        try {
            await fs.access(dirPath, fs.constants.F_OK);
        } 
        catch(error){
            res.status(404).json({ message: `${heroName}暂无3D模型` });
            return;
        }

        const animations = await fs.readFile(path.join(__dirname, '../', 'public', 'assets', 'models', 'heroes', heroName.toLowerCase(), 'animations.json'), 'utf8');
        const jsonData= JSON.parse(animations);
        const smdPath = jsonData['default']['path'];
        console.log(smdPath)
        res.status(200).json({smdFileName: smdPath});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}