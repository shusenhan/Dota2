class Hero {
    constructor({
        HeroId,
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
        IsPuher
    }){
        this.HeroId = HeroId;
        this.HeroName = HeroName;
        this.HeroCNName = HeroCNName;
        this.HeroType = HeroType;
        this.Image1 = Image1;
        this.Image2 = Image2;
        this.Image3 = Image3;
        this.InitStrength = InitStrength;
        this.StrengthGrowth = StrengthGrowth;
        this.InitAgility = InitAgility;
        this.AgilityGrowth = AgilityGrowth;
        this.InitIntelligence = InitIntelligence;
        this.IntelligenceGrowth = IntelligenceGrowth;
        this.InitHealth = InitHealth;
        this.InitHealthRecover = InitHealthRecover;
        this.InitMana = InitMana;
        this.InitManaRecover = InitManaRecover;
        this.InitArmor = InitArmor;
        this.InitMagicResist = InitMagicResist;
        this.DamageMin = DamageMin;
        this.DamageMax = DamageMax;
        this.AttackType = AttackType;
        this.AttackRange = AttackRange;
        this.InitAttackSpeed = InitAttackSpeed;
        this.AttackRate = AttackRate;
        this.AttackAnimation1 = AttackAnimation1;
        this.AttackAnimation2 = AttackAnimation2;
        this.ProjectileSpeed = ProjectileSpeed;
        this.MoveSpeed = MoveSpeed;
        this.TurnRate = TurnRate;
        this.DayVision = DayVision;
        this.NightVision = NightVision;
        this.Complixity = Complixity;
        this.IsDisable = IsDisable;
        this.IsDurable = IsDurable;
        this.IsEscape = IsEscape;
        this.IsInitiator = IsInitiator;
        this.IsNuker = IsNuker;
        this.IsPuher = IsPuher;
    }
}

export default Hero;