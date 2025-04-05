class NPC {
    constructor({
        NPCId,
        NPCName,
        NPCCNName,
        NPCLevel,
        NPCIcon,
        InitHealth,
        InitMana,
        InitHealthRecover,
        InitManaRecover,
        InitArmor,
        InitMagicResist,
        DamageMin,
        DamageMax,
        AttackType,
        NPCDescription,
    }){
        this.NPCId = NPCId;
        this.NPCName = NPCName;
        this.NPCCNName = NPCCNName;
        this.NPCLevel = NPCLevel;
        this.NPCIcon = NPCIcon;
        this.InitHealth = InitHealth;
        this.InitMana = InitMana;
        this.InitHealthRecover = InitHealthRecover;
        this.InitManaRecover = InitManaRecover;
        this.InitArmor = InitArmor;
        this.InitMagicResist = InitMagicResist;
        this.DamageMin = DamageMin;
        this.DamageMax = DamageMax;
        this.AttackType = AttackType;
        this.NPCDescription = NPCDescription;
    }
}