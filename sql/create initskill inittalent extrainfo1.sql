create table extrainfo1(
	HeroName varchar(100) primary key not null,
	HeroDescription varchar(2000) not null,
    HeroComplixity int not null,
    IsCore int not null,
    IsSupport int not null,
    IsDisabker int not null,
    IsDurable int not null,
    IsEscape int not null,
    IsInitiator int not null,
    IsNuker int not null,
    IsPusher int not null
);

create table initskill(
	SkillOwner varchar(100) primary key not null,
    InitSkillName varchar(100) default '',
    InitSkillCNName varchar(100) not null,
    InitSkillDescription varchar(1000) default '',
    CD varchar(100) default '',
    Cost varchar(100) default '',
    Statistic varchar(1000) default '',
    ExtraDescriptiton varchar(1000) default ''
);

create table inittalent(
	TalentOwner varchar(100) primary key not null,
    TalentName varchar(100) default '',
    TalentCNName varchar(100) not null,
    TalentSequence int not null,
    TalentImage varchar(200) default '',
    TalentDescription varchar(1000) default '',
    AffectSkill varchar(100) default '',
    Statistic varchar(1000) default '',
    ExtraDescription varchar(1000) default ''
);