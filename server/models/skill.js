class Skill {
    constructor({
        SkillId,
        SkillName,
        SkillCNName,
        SkillDescription,
        SkillImage1,
        SkillImage2,
        SkillImage3,
        SkillType,
        Cost,
        SkillCD,
        Sequence,
        ExtraInfo1,
        ExtraInfo2,
        ExtraInfo3,
        Owner
    }){
        this.SkillId = SkillId;
        this.SkillName = SkillName;
        this.SkillCNName = SkillCNName;
        this.SkillDescription = SkillDescription;
        this.SkillImage1 = SkillImage1;
        this.SkillImage2 = SkillImage2;
        this.SkillImage3 = SkillImage3;
        this.SkillType = SkillType;
        this.Cost = Cost;
        this.SkillCD = SkillCD;
        this.Sequence = Sequence;
        this.ExtraInfo1 = ExtraInfo1;
        this.ExtraInfo2 = ExtraInfo2;
        this.ExtraInfo3 = ExtraInfo3;
        this.Owner = Owner;
    }
}

export default Skill;