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

// 英雄
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

// 技能
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
    const sql = `select * from skills where SkillType = 0`;

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

export async function GetAllItemSkills() {
    const sql = `select * from skills where SkillType = 1`;

    try{
        const [results, ] = await pool.promise().query(sql, [])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `数据库中还没有物品技能！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取所有已存在的物品技能失败，错误信息：${error.message}`};
    }
};

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
        IsAghanim,
        IsInitSkill,
        SkillType) values (?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?)`;

    try {
        const SkillImage1 = skill.SkillImage1 ? skill.SkillImage1[1] : '';
        
        const [results] = await pool.promise().query(sql, [
        skill.SkillName,
        skill.SkillCNName,
        skill.SkillDescription,
        SkillImage1,
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
        skill.IsAghanim,
        skill.IsInitSkill,
        skill.SkillType]);

        if(results.affectedRows) {
            console.log('200')
            return {code: 200, message:`技能${skill.SkillName}已成功添加至数据库中！`};
        }
        else{
            console.log('404')
            return {code: 404, message:`技能${skill.SkillName}未能添加至数据库中！`};
        }
    } 
    catch (error) {
        console.log('500')
        console.log('error.message :', error.message)
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
            IsInitSkill = ?,
            SkillType = ?
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
                skill.IsInitSkill,
                skill.SkillType,
                
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

// 阿哈利姆
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

// 命石
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
    console.log(initTalent)

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
                initTalent.InitTalentImage[1],
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

// 天赋
export async function GetTalentByHeroName(heroName){
    const sql = `select * from talent where TalentOwner = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [heroName])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `未能取得${heroName}的天赋数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${heroName}的天赋数据失败，错误信息：${error.message}`};
    }
}

export async function InsertTalent(talent){
    const sql = `insert into talent (
        TalentOwner,
        Lvl10TalentL,
        Lvl10TalentR,
        Lvl15TalentL,
        Lvl15TalentR,

        Lvl20TalentL,
        Lvl20TalentR,
        Lvl25TalentL,
        Lvl25TalentR) values (?,?,?,?,?,
            ?,?,?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            talent.TalentOwner,
            talent.Lvl10TalentL,
            talent.Lvl10TalentR,
            talent.Lvl15TalentL,
            talent.Lvl15TalentR,
            talent.Lvl20TalentL,
            talent.Lvl20TalentR,
            talent.Lvl25TalentL,
            talent.Lvl25TalentR
        ]);

        if(results.affectedRows) {
            return {code: 200, message:`${talent.TalentOwner}的天赋数据已成功添加至数据库中！`};
        }
        else{
            return {code: 404, message:`${talent.TalentOwner}的天赋数据未能添加至数据库中！`};
        }
    } 
    catch (error) {
        return {code: 500, message:`${talent.TalentOwner}的天赋数据插入失败，错误信息：${error.message}`};
    }
}

export async function UpdateTalent(talent){
    const sql = `
        update talent 
        set
            TalentOwner = ?,
            Lvl10TalentL = ?,
            Lvl10TalentR = ?,
            Lvl15TalentL = ?,
            Lvl15TalentR = ?,

            Lvl20TalentL = ?,
            Lvl20TalentR = ?,
            Lvl25TalentL = ?,
            Lvl25TalentR = ?
        where TalentOwner = ?`;

    try {
        const [results] = await pool.promise().query(sql, [
            talent.TalentOwner,
            talent.Lvl10TalentL,
            talent.Lvl10TalentR,
            talent.Lvl15TalentL,
            talent.Lvl15TalentR,
            talent.Lvl20TalentL,
            talent.Lvl20TalentR,
            talent.Lvl25TalentL,
            talent.Lvl25TalentR,
            talent.TalentOwner
        ]);

        if(results.affectedRows) {
            return {code: 200, message:`已成功更新${talent.TalentOwner}的天赋数据！`};
        }
        else{
            return {code: 404, message:`未能更新${talent.TalentOwner}的天赋数据！`};
        }
    } catch (error) {
        return {code: 500, message:`更新${talent.TalentOwner}的天赋数据失败，错误信息：${error.message}`};
    }
}

// 装备
export async function GetAllItems(){
    const sql = `select * from items`;

    try{
        const [results, ] = await pool.promise().query(sql, [])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `未能取得物品数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取物品数据失败，错误信息：${error.message}`};
    }
}

export async function InsertItem(item){

    const sql = `insert into items (
        ItemName,
        ItemCNName,
        ItemImage1,
        ItemImage2,
        ItemType,

        ItemExtraInfo,
        ItemDescription,
        ItemBackground,
        Health,
        Mana,

        HealthRecover,
        ManaRecover,
        Damage,
        Strength,
        Agility,

        Intelligence,
        Armor,
        MagicResist,
        AttackSpeed,
        Movespeed,

        MovespeedPercentage,
        HealthSteal,
        SkillHealthSteal,
        SkillEnhence,
        Dodge,

        OtherAttribute,
        ItemPrice) values (?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            item.ItemName,
            item.ItemCNName,
            item.ItemImage1,
            item.ItemImage2,
            item.ItemType,

            item.ItemExtraInfo,
            item.ItemDescription,
            item.ItemBackground,
            item.Health,
            item.Mana,

            item.HealthRecover,
            item.ManaRecover,
            item.Damage,
            item.Strength,
            item.Agility,

            item.Intelligence,
            item.Armor,
            item.MagicResist,
            item.AttackSpeed,
            item.Movespeed,

            item.MovespeedPercentage,
            item.HealthSteal,
            item.SkillHealthSteal,
            item.SkillEnhence,
            item.Dodge,

            item.OtherAttribute,
            item.ItemPrice
        ]);

        if(results.affectedRows) {
            return {code: 200, message:`物品${item.ItemCNName}已成功添加至数据库中！`};
        }
        else{
            return {code: 404, message:`物品${item.ItemCNName}未能添加至数据库中！`};
        }
    }
    catch(error){
        return {code: 500, message: `物品${item.ItemCNName}信息插入失败，错误信息：${error.message}`};
    }
}

export async function UpdateItem(item){
    const sql = `
        update items 
        set
            ItemName = ?,
            ItemCNName = ?,
            ItemImage1 = ?,
            ItemImage2 = ?,
            ItemType = ?,

            ItemExtraInfo = ?,
            ItemDescription = ?,
            ItemBackground = ?,
            Health = ?,
            Mana = ?,

            HealthRecover = ?,
            ManaRecover = ?,
            Damage = ?,
            Strength = ?,
            Agility = ?,

            Intelligence = ?,
            Armor = ?,
            MagicResist = ?,
            AttackSpeed = ?,
            Movespeed = ?,

            MovespeedPercentage = ?,
            HealthSteal = ?,
            SkillHealthSteal = ?,
            SkillEnhence = ?,
            Dodge = ?,

            OtherAttribute = ?
            ItemPrice = ?
        where ItemName = ?`;

    try {
        const [results] = await pool.promise().query(sql, [
            item.ItemName,
            item.ItemCNName,
            item.ItemImage1,
            item.ItemImage2,
            item.ItemType,

            item.ItemExtraInfo,
            item.ItemDescription,
            item.ItemBackground,
            item.Health,
            item.Mana,

            item.HealthRecover,
            item.ManaRecover,
            item.Damage,
            item.Strength,
            item.Agility,

            item.Intelligence,
            item.Armor,
            item.MagicResist,
            item.AttackSpeed,
            item.Movespeed,

            item.MovespeedPercentage,
            item.HealthSteal,
            item.SkillHealthSteal,
            item.SkillEnhence,
            item.Dodge,

            item.OtherAttribute,
            item.ItemPrice,

            item.ItemName,
        ]);

        if(results.affectedRows) {
            return {code: 200, message:`已成功更新物品${item.ItemName}的数据！`};
        }
        else{
            return {code: 404, message:`未能更新物品${item.ItemName}的数据！`};
        }
    } catch (error) {
        return {code: 500, message:`更新物品${item.ItemName}的数据失败，错误信息：${error.message}`};
    }
}

export async function GetItemByName(itemName){
    const sql = `select * from items where ItemName = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [itemName])
        if(results.length){
            return {code: 200, data: results[0]}
        }
        else{
            return {code: 404, message: `未能取得${itemName}的数据！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${itemName}数据失败，错误信息：${error.message}`};
    }
}

//用户
export async function InsertUser(user){
    const sql = `insert into useraccount (
        UserName,
        UserIcon,
        AccountPassword,
        UserRole,
        AccountState,

        LoginState,
        CreateAt,
        LastLogin,
        CommunityLevel,
        CurrentExp) values (?,?,?,?,?,
            ?,?,?,?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            user.UserName,
            user.UserIcon,
            user.AccountPassword,
            user.UserRole,
            user.AccountState,

            user.LoginState,
            user.CreateAt,
            user.LastLogin,
            user.CommunityLevel,
            user.CurrentExp]);

        if(results.affectedRows) {
            return {code: 200, message:`用户${user.UserName}创建成功！`};
        }
        else{
            return {code: 404, message:`用户${user.UserName}创建失败`};
        }
    } 
    catch (error) {
        return {code: 500, message:`用户${user.UserName}创建错误，错误信息：${error.message}`};
    }
}

export async function UpdateUser(user, userId){
    const sql = `
        update useraccount 
        set
            UserName = ?,
            UserIcon = ?,
            AccountPassword = ?,
            UserRole = ?,
            AccountState = ?,

            LoginState = ?,
            CreateAt = ?,
            LastLogin = ?,
            CommunityLevel = ?,
            CurrentExp = ?
        where UserId = ?`;

    try {
        const [results] = await pool.promise().query(sql, [
            user.UserName,
            user.UserIcon,
            user.AccountPassword,
            user.UserRole,
            user.AccountState,

            user.LoginState,
            user.CreateAt,
            user.LastLogin,
            user.CommunityLevel,
            user.CurrentExp,
            
            userId
        ]);

        if(results.affectedRows) {
            return {code: 200, message:`已成功更新用户${user.UserName}的数据！`};
        }
        else{
            return {code: 404, message:`未能更新用户${user.UserName}的数据！`};
        }
    } catch (error) {
        return {code: 500, message:`更新用户${user.UserName}的数据失败，错误信息：${error.message}`};
    }
}

export async function GetUserByUserName(username){
    const sql = `select * from useraccount where UserName = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [username])

        console.log(results)
        
        if(results.length){
            return {code: 200, data: results[0]}
        }
        else{
            return {code: 404, message: `没有发现${username}的账户！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取${username}账户失败，错误信息：${error.message}`};
    }
}

export async function GetUserFriendList(username){
    const sql = `select * from friendships where User1 = ? or User2 = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [username, username]);
        if(results.length){ 
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `没有发现任何好友！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取好友列表失败，错误信息：${error.message}`};
    }
}

export async function SetFriendShip(friendship){
    const sql = `insert into friendships (
        User1,
        User2,
        State) values (?,?,?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            friendship.User1,
            friendship.User2,
            friendship.State]);

        if(results.affectedRows) {
            return {code: 200, message:`发送好友请求成功！`};
        }
        else{
            return {code: 404, message:`发送好友请求失败`};
        }
    } 
    catch (error) {
        return {code: 500, message:`发送好友请求错误，错误信息：${error.message}`};
    }
}

export async function ConfirmFriendShip(friendship){
    const sql = `
        update friendships 
        set
            State = ?
        where 
            User1 = ? and User2 = ?`;

    try {
        const [results] = await pool.promise().query(sql, [
            friendship.State,
            friendship.User1,
            friendship.User2]);

        if(results.affectedRows) {
            return {code: 200, message:`已成功添加好友！`};
        }
        else{
            return {code: 404, message:`未能添加好友！`};
        }
    } catch (error) {
        return {code: 500, message:`添加好友失败，错误信息：${error.message}`};
    }
}

export async function DeleteFriendShip(friendship){
    const sql = `
        delete from friendships
        where 
            (User1 = ? and User2 = ?) or (User1 = ? and User2 = ?)`;

    try {
        const [results] = await pool.promise().query(sql, [
            friendship.User1,
            friendship.User2,
            friendship.User2,
            friendship.User1]);

        if(results.affectedRows) {
            return {code: 200, message:`已成功删除好友！`};
        }
        else{
            return {code: 404, message:`未能删除好友！`};
        }
    } catch (error) {
        return {code: 500, message:`删除好友失败，错误信息：${error.message}`};
    }
}

export async function SearchUser(UserName){
    const sql = `
        select 
            UserName, 
            UserId, 
            UserIcon,
            UserRole,
            AccountState,
            CommunityLevel,
            CurrentExp
        from 
            useraccount 
        where 
            UserName = ?`;

    try{
        const [results, ] = await pool.promise().query(sql, [UserName])
        if(results.length){
            return {code: 200, data: results}
        }
        else{
            return {code: 404, message: `没有发现任何用户！`}
        }
    }
    catch(error){
        return {code: 500, message: `搜索用户失败，错误信息：${error.message}`};
    }
}

export async function IsFriend(User1, User2){
    const sql = `select * from friendships where (User1 = ? and User2 = ?) or (User1 = ? and User2 = ?)`;

    try{
        const [results, ] = await pool.promise().query(sql, [User1, User2, User2, User1])

        if(results.length){
            return {code: 200, data: results[0]}
        }
        else{
            return {code: 404, message: `还不是好友关系！`}
        }
    }
    catch(error){
        return {code: 500, message: `获取好友关系失败，错误信息：${error.message}`};
    }
}