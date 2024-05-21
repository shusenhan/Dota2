create table skills (
	SkillId int auto_increment primary key,
    SkillName varchar(100) not null,
    SkillCNName varchar(100) not null,
    SkillOwner varchar(100) not null,
    SkillDescription varchar(2000) not null,
    SkillImage1 varchar(200),
    SkillImage2 varchar(200),
    SkillImage3 varchar(200),
    SkillType int not null,
    Cost varchar(100) not null,
    SkillCD varchar(100) not null,
    Sequence int not null,
    ExtraInfo1 varchar(1000),
    ExtraInfo2 varchar(1000),
    ExtraInfo3 varchar(1000)
);