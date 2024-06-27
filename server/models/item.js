class Item {
    constructor({
        ItemId,
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
        ItemPrice
    }){
        this.ItemId = ItemId;
        this.ItemName = ItemName;
        this.ItemCNName = ItemCNName;
        this.ItemImage1 = ItemImage1;
        this.ItemImage2 = ItemImage2;
        this.ItemType = ItemType;
        this.ItemExtraInfo = ItemExtraInfo;
        this.ItemDescription = ItemDescription;
        this.ItemBackground = ItemBackground;
        this.Health = Health;
        this.Mana = Mana;
        this.HealthRecover = HealthRecover;
        this.ManaRecover = ManaRecover;
        this.Damage = Damage;
        this.Strength = Strength;
        this.Agility = Agility;
        this.Intelligence = Intelligence;
        this.Armor = Armor;
        this.MagicResist = MagicResist;
        this.AttackSpeed = AttackSpeed;
        this.Movespeed = Movespeed;
        this.MovespeedPercentage = MovespeedPercentage;
        this.HealthSteal = HealthSteal;
        this.SkillHealthSteal = SkillHealthSteal;
        this.SkillEnhence = SkillEnhence;
        this.Dodge = Dodge;
        this.OtherAttribute = OtherAttribute;
        this.ItemPrice = ItemPrice;
    }
}

export default Item;