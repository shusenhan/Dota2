import mysql from "mysql2";
import Skill from "./models/skill.js";
import Hero from "./models/hero.js";

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'admin123', 
    database: 'dota' ,
    waitForConnections: true,
});

export async function GetHeroByName(heroName){
    const sql = `select * from heros where HeroName = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [heroName])
        if(results.length){
            return {code: 200, data: new Hero(results[0])}
        }
        else{
            return {code: 404, message: `未能取得${heroName}的数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${heroName}数据失败，错误信息：${error.message}`};
    }
}

export async function InsertHero(hero){
    const sql = `insert into heros (
        HeroName,
        HeroCNName,
        HeroType,
        Image1,
        Image2,

        Image3,
        InitStrength,
        StrengthGrowth,
        InitAgility,
        AgilityGrowth,

        InitIntelligence,
        IntelligenceGrowth,
        InitHealth,
        InitHealthRecover,
        InitMana,

        InitManaRecover,
        InitArmor,
        InitMagicResist,
        DamageMin,
        DamageMax,

        AttackType,
        AttackRange,
        InitAttackSpeed,
        AttackRate,
        AttackAnimation1,

        AttackAnimation2,
        ProjectileSpeed,
        MoveSpeed,
        TurnRate,
        DayVision,

        NightVision,
        Complixity,
        IsDisable,
        IsDurable,
        IsEscape,

        IsInitiator,
        IsNuker,
        IsPuher,) values (?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            hero.HeroName,
            hero.HeroCNName,
            hero.HeroType,
            hero.Image1,
            hero.Image2,
            hero.Image3,
            hero.InitStrength,
            hero.StrengthGrowth,
            hero.InitAgility,
            hero.AgilityGrowth,
            hero.InitIntelligence,
            hero.IntelligenceGrowth,
            hero.InitHealth,
            hero.InitHealthRecover,
            hero.InitMana,
            hero.InitManaRecover,
            hero.InitArmor,
            hero.InitMagicResist,
            hero.DamageMin,
            hero.DamageMax,
            hero.AttackType,
            hero.AttackRange,
            hero.InitAttackSpeed,
            hero.AttackRate,
            hero.AttackAnimation1,
            hero.AttackAnimation2,
            hero.ProjectileSpeed,
            hero.MoveSpeed,
            hero.TurnRate,
            hero.DayVision,
            hero.NightVision,
            hero.Complixity,
            hero.IsDisable,
            hero.IsDurable,
            hero.IsEscape,
            hero.IsInitiator,
            hero.IsNuker,
            hero.IsPuher]);

        if(results.affectedRows) {
            return {code: 200, message:`英雄${hero.HeroName}已成功添加至数据库中！`};
        }
        else{
            return {code: 404, message:`英雄${hero.HeroName}未能添加至数据库中！`};
        }
    } 
    catch (error) {
        return {code: 500, message:`英雄${hero.HeroName}信息插入失败，错误信息：${error.message}`};
    }
}

export async function UpdateHero(hero){
    const sql = `
        update heros 
        set
            HeroName = ?,
            HeroCNName = ?,
            HeroType = ?,
            Image1 = ?,
            Image2 = ?,

            Image3 = ?,
            InitStrength = ?,
            StrengthGrowth = ?,
            InitAgility = ?,
            AgilityGrowth = ?,

            InitIntelligence = ?,
            IntelligenceGrowth = ?,
            InitHealth = ?,
            InitHealthRecover = ?,
            InitMana = ?,

            InitManaRecover = ?,
            InitArmor = ?,
            InitMagicResist = ?,
            DamageMin = ?,
            DamageMax = ?,

            AttackType = ?,
            AttackRange = ?,
            InitAttackSpeed = ?,
            AttackRate = ?,
            AttackAnimation1 = ?,

            AttackAnimation2 = ?,
            ProjectileSpeed = ?,
            MoveSpeed = ?,
            TurnRate = ?,
            DayVision = ?,

            NightVision = ?,
            Complixity = ?,
            IsDisable = ?,
            IsDurable = ?,
            IsEscape = ?,

            IsInitiator = ?,
            IsNuker = ?,
            IsPuher = ?,
        where HeroName = ? `;

        try {
            const [results] = await pool.promise().query(sql, [
                hero.HeroName,
                hero.HeroCNName,
                hero.HeroType,
                hero.Image1,
                hero.Image2,
                hero.Image3,
                hero.InitStrength,
                hero.StrengthGrowth,
                hero.InitAgility,
                hero.AgilityGrowth,
                hero.InitIntelligence,
                hero.IntelligenceGrowth,
                hero.InitHealth,
                hero.InitHealthRecover,
                hero.InitMana,
                hero.InitManaRecover,
                hero.InitArmor,
                hero.InitMagicResist,
                hero.DamageMin,
                hero.DamageMax,
                hero.AttackType,
                hero.AttackRange,
                hero.InitAttackSpeed,
                hero.AttackRate,
                hero.AttackAnimation1,
                hero.AttackAnimation2,
                hero.ProjectileSpeed,
                hero.MoveSpeed,
                hero.TurnRate,
                hero.DayVision,
                hero.NightVision,
                hero.HeroName,
                hero.Complixity,
                hero.IsDisable,
                hero.IsDurable,
                hero.IsEscape,
                hero.IsInitiator,
                hero.IsNuker,
                hero.IsPuher
            ]);

            if(results.affectedRows) {
                console.log('correct!')
                return {code: 200, message:`已成功更新英雄${hero.HeroName}的数据！`};
            }
            else{
                return {code: 404, message:`未能更新英雄${hero.HeroName}的数据！`};
            }
        } catch (error) {
            return {code: 500, message:`更新英雄${hero.HeroName}的数据失败，错误信息：${error.message}`};
        }
}

export async function GetAllHeroName(){
    const sql = `select distinct HeroName, HeroCNName, HeroType from heros`;

    try{
        const [results, ] = await pool.promise().query(sql, [])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `数据库中还没有英雄！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取所有已存在英雄的名称失败，错误信息：${error.message}`};
    }
}

export async function GetSkillByHeroName(heroName){
    const sql = `select * from skills where Owner = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [heroName])
        if(results.length){
            return {code: 200, data: results.map(skill => new Skill(skill))}
        }
        else{
            return {code: 404, message: `未能取得${heroName}的技能！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${heroName}的技能失败，错误信息：${error.message}`};
    }
}

export async function GetAllSkills(){
    const sql = `select * from skills`;

    try{
        const [results, ] = await pool.promise().query(sql, [])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `数据库中还没有技能！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取所有已存在的技能失败，错误信息：${error.message}`};
    }
}

export async function GetSkillByName(skillName){
    const sql = `select * from skills where SkillName = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [skillName])
        if(results.length){
            return {code: 200, data: new Skill(results[0])}
        }
        else{
            return {code: 404, message: `未能取得${skillName}的数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${skillName}数据失败，错误信息：${error.message}`};
    }
}

export async function InsertSkill(skill){
    const sql = `insert into skills (
        SkillName,
        SkillCNName,
        SkillDescription,
        SkillImage1,
        SkillImage2,

        SkillImage3,
        Cost,
        SkillCD,
        Sequence,

        ExtraInfo1,
        ExtraInfo2,
        ExtraInfo3,
        Owner,
        Affect,
        
        InitTalent,
        InitTalentDescription,
        IgnoreBKB,
        Dispellable,
        DamageType,
        
        Ability,
        CastRange) values (?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
        skill.SkillName,
        skill.SkillCNName,
        skill.SkillDescription,
        skill.SkillImage1[1],
        skill.SkillImage2,

        skill.SkillImage3,
        skill.Cost,
        skill.SkillCD,
        skill.Sequence,

        skill.ExtraInfo1,
        skill.ExtraInfo2,
        skill.ExtraInfo3,
        skill.Owner,
        skill.Affect,
        
        skill.InitTalent,
        Skill.InitTalentDescription,
        skill.IgnoreBKB,
        skill.Dispellable,
        skill.DamageType,
        
        skill.Ability,
        skill.CastRange]);

        if(results.affectedRows) {
            return {code: 200, message:`技能${skill.SkillName}已成功添加至数据库中！`};
        }
        else{
            return {code: 404, message:`技能${skill.SkillName}未能添加至数据库中！`};
        }
    } 
    catch (error) {
        return {code: 500, message:`技能${skill.SkillName}信息插入失败，错误信息：${error.message}`};
    }
}

export async function UpdateSkill(skill){
    const sql = `
        update skills 
        set
            SkillName = ?,
            SkillCNName = ?,
            SkillDescription = ?,
            SkillImage1 = ?,
            SkillImage2 = ?,

            SkillImage3 = ?,
            Cost = ?,
            SkillCD = ?,
            Sequence = ?,
            ExtraInfo1 = ?,

            ExtraInfo2 = ?,
            ExtraInfo3 = ?,
            Owner = ?,
            Affect = ?,
            InitTalent = ?,

            InitTalentDescription = ?,
            IgnoreBKB = ?,
            Dispellable = ?,
            DamageType = ?,
            Ability = ?,

            CastRange = ?
        where SkillName = ? `;

        try {
            const [results] = await pool.promise().query(sql, [
                skill.SkillName,
                skill.SkillCNName,
                skill.SkillDescription,
                skill.SkillImage1[1],
                skill.SkillImage2,

                skill.SkillImage3,
                skill.Cost,
                skill.SkillCD,
                skill.Sequence,
                skill.ExtraInfo1,

                skill.ExtraInfo2,
                skill.ExtraInfo3,
                skill.Owner,
                skill.Affect,
                skill.InitTalent,

                skill.InitTalentDescription,
                skill.IgnoreBKB,
                skill.Dispellable,
                skill.DamageType,
                skill.Ability,

                skill.CastRange,
                
                skill.SkillName,
            ]);

            if(results.affectedRows) {
                return {code: 200, message:`已成功更新技能${skill.SkillName}的数据！`};
            }
            else{
                return {code: 404, message:`未能更新技能${skill.SkillName}的数据！`};
            }
        } catch (error) {
            return {code: 500, message:`更新技能${skill.SkillName}的数据失败，错误信息：${error.message}`};
        }
}