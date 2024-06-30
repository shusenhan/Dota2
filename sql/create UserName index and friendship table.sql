CREATE INDEX idx_users_username ON useraccount (UserName);

create table friendships(
	User1 varchar(100) not null,
    User2 varchar(100) not null,
    State int not null default 0,
    primary key (User1, User2),
	foreign key (User1) references useraccount(UserName) on delete cascade,
    foreign key (User2) references useraccount(UserName) on delete cascade
);