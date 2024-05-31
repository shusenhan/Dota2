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
            IsPusher = ?
        where HeroName = ?`;

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
                hero.IsPusher,

                hero.HeroName
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
        CastRange,
        IsAghanim) values (?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?)`;

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
        skill.CastRange,
        skill.IsAghanim]);

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

            CastRange = ?,
            IsAghanim = ?
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
                skill.IsAghanim,
                
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

export async function GetAghanimByHeroName(heroName){
    const sql = `select * from aghanim where EffectOwner = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [heroName])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `未能取得${heroName}的阿哈利姆数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${heroName}的阿哈利姆数据失败，错误信息：${error.message}`};
    }
}

export async function InsertAghanim(aghanim){
    
    const sql = `insert into aghanim (
        EffectOwner,
        AffectSkill1,
        Description1,
        IsNewSkill1,
        IsShard1,

        ExtraInfo1,
        AffectSkill2,
        Description2,
        IsNewSkill2,
        IsShard2,

        ExtraInfo2,
        AffectSkill3,
        Description3,
        IsNewSkill3,
        IsShard3,

        ExtraInfo3,
        AffectSkill4,
        Description4,
        IsNewSkill4,
        IsShard4,

        ExtraInfo4) values (?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?)`;

    try{
        const [result] = await pool.promise().query(sql, [
            aghanim.EffectOwner,
            aghanim.AffectSkill1,
            aghanim.Description1,
            aghanim.IsNewSkill1,
            aghanim.IsShard1,

            aghanim.ExtraInfo1,
            aghanim.AffectSkill2,
            aghanim.Description2,
            aghanim.IsNewSkill2,
            aghanim.IsShard2,

            aghanim.ExtraInfo2,
            aghanim.AffectSkill3,
            aghanim.Description3,
            aghanim.IsNewSkill3,
            aghanim.IsShard3,

            aghanim.ExtraInfo3,
            aghanim.AffectSkill4,
            aghanim.Description4,
            aghanim.IsNewSkill4,
            aghanim.IsShard4,

            aghanim.ExtraInfo4
        ]);

        if(result.affectedRows){
            return {code: 200, message: `阿哈利姆数据已成功添加至数据库中！`};
        }
        else{
            return {code: 404, message: `阿哈利姆数据未能添加至数据库中！`};
        }
    }
    catch(error){
        return {code: 500, message: `阿哈利姆数据插入失败，错误信息：${error.message}`};
    }
}

export async function UpdateAghanim(aghanim){
    const sql = `
        update aghanim 
        set
            EffectOwner = ?,
            AffectSkill1 = ?,
            Description1 = ?,
            IsNewSkill1 = ?,
            IsShard1 = ?,

            ExtraInfo1 = ?,
            AffectSkill2 = ?,
            Description2 = ?,
            IsNewSkill2 = ?,
            IsShard2 = ?,

            ExtraInfo2 = ?,
            AffectSkill3 = ?,
            Description3 = ?,
            IsNewSkill3 = ?,
            IsShard3 = ?,

            ExtraInfo3 = ?,
            AffectSkill4 = ?,
            Description4 = ?,
            IsNewSkill4 = ?,
            IsShard4 = ?,

            ExtraInfo4 = ?
        where EffectOwner = ? `;

        try {
            const [results] = await pool.promise().query(sql, [
                aghanim.EffectOwner,
                aghanim.AffectSkill1,
                aghanim.Description1,
                aghanim.IsNewSkill1,
                aghanim.IsShard1,

                aghanim.ExtraInfo1,
                aghanim.AffectSkill2,
                aghanim.Description2,
                aghanim.IsNewSkill2,
                aghanim.IsShard2,

                aghanim.ExtraInfo2,
                aghanim.AffectSkill3,
                aghanim.Description3,
                aghanim.IsNewSkill3,
                aghanim.IsShard3,

                aghanim.ExtraInfo3,
                aghanim.AffectSkill4,
                aghanim.Description4,
                aghanim.IsNewSkill4,
                aghanim.IsShard4,

                aghanim.ExtraInfo4,
                aghanim.EffectOwner
            ]);

            if(results.affectedRows) {
                return {code: 200, message:`已成功更新${aghanim.EffectOwner}的阿哈利姆数据！`};
            }
            else{
                return {code: 404, message:`未能更新${aghanim.EffectOwner}的阿哈利姆数据！`};
            }
        } catch (error) {
            return {code: 500, message:`更新${aghanim.EffectOwner}的阿哈利姆数据失败，错误信息：${error.message}`};
        }
}

export async function GetInitTalentByHeroName(heroName){
    const sql = `select * from inittalent where InitTalentOwner = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [heroName])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `未能取得${heroName}的命石数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${heroName}的命石数据失败，错误信息：${error.message}`};
    }
}

export async function GetInitTalentByName(initTalentName){
    const sql = `select * from inittalent where InitTalentCNName = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [initTalentName])
        if(results.length){
            return {code: 200, data: results[0]}
        }
        else{
            return {code: 404, message: `未能取得${initTalentName}的数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${initTalentName}数据失败，错误信息：${error.message}`};
    }

}

export async function InsertInitTalent(initTalent){
    const sql = `insert into inittalent (
        InitTalentOwner,
        InitTalentSequence,
        InitTalentImage,
        InitTalentName,
        InitTalentCNName,

        InitTalentColor,
        InitTalentDescription,
        ITIsNewSkill1,
        ITAffectSkill1,
        ITDetails1,

        ITStatistic1,
        ITIsNewSkill2,
        ITAffectSkill2,
        ITDetails2,
        ITStatistic2,

        ITIsNewSkill3,
        ITAffectSkill3,
        ITDetails3,
        ITStatistic3) values (?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            initTalent.InitTalentOwner,
            initTalent.InitTalentSequence,
            initTalent.InitTalentImage,
            initTalent.InitTalentName,
            initTalent.InitTalentCNName,

            initTalent.InitTalentColor,
            initTalent.InitTalentDescription,
            initTalent.ITIsNewSkill1,
            initTalent.ITAffectSkill1,
            initTalent.ITDetails1,

            initTalent.ITStatistic1,
            initTalent.ITIsNewSkill2,
            initTalent.ITAffectSkill2,
            initTalent.ITDetails2,
            initTalent.ITStatistic2,

            initTalent.ITIsNewSkill3,
            initTalent.ITAffectSkill3,
            initTalent.ITDetails3,
            initTalent.ITStatistic3
        ]);

        if(results.affectedRows) {
            return {code: 200, message:`命石${initTalent.InitTalentCNName}数据已成功添加至数据库中！`};
        }
        else{
            return {code: 404, message:`命石${initTalent.InitTalentCNName}数据未能添加至数据库中！`};
        }
    } 
    catch (error) {
        return {code: 500, message:`命石${initTalent.InitTalentCNName}数据插入失败，错误信息：${error.message}`};
    }
}

export async function UpdateInitTalent(initTalent){
    const sql = `
        update inittalent 
        set
            InitTalentOwner = ?,
            InitTalentSequence = ?,
            InitTalentImage = ?,
            InitTalentName = ?,
            InitTalentCNName = ?,

            InitTalentColor = ?,
            InitTalentDescription = ?,
            ITIsNewSkill1 = ?,
            ITAffectSkill1 = ?,
            ITDetails1 = ?,

            ITStatistic1 = ?,
            ITIsNewSkill2 = ?,
            ITAffectSkill2 = ?,
            ITDetails2 = ?,
            ITStatistic2 = ?,

            ITIsNewSkill3 = ?,
            ITAffectSkill3 = ?,
            ITDetails3 = ?,
            ITStatistic3 = ?
        where InitTalentCNName = ?`;

        try {
            const [results] = await pool.promise().query(sql, [
                initTalent.InitTalentOwner,
                initTalent.InitTalentSequence,
                initTalent.InitTalentImage,
                initTalent.InitTalentName,
                initTalent.InitTalentCNName,

                initTalent.InitTalentColor,
                initTalent.InitTalentDescription,
                initTalent.ITIsNewSkill1,
                initTalent.ITAffectSkill1,
                initTalent.ITDetails1,

                initTalent.ITStatistic1,
                initTalent.ITIsNewSkill2,
                initTalent.ITAffectSkill2,
                initTalent.ITDetails2,
                initTalent.ITStatistic2,

                initTalent.ITIsNewSkill3,
                initTalent.ITAffectSkill3,
                initTalent.ITDetails3,
                initTalent.ITStatistic3,

                initTalent.InitTalentCNName
            ]);

            if(results.affectedRows) {
                return {code: 200, message:`已成功更新命石${initTalent.InitTalentCNName}的数据！`};
            }
            else{
                return {code: 404, message:`未能更新命石${initTalent.InitTalentCNName}的数据！`};
            }
        } catch (error) {
            return {code: 500, message:`更新命石${initTalent.InitTalentCNName}的数据失败，错误信息：${error.message}`};
        }
}