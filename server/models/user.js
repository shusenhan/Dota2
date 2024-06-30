class User {
    constructor({
        UserId,
        UserName,
        UserIcon,
        AccountPassword,
        UserRole,
        AccountState,
        // 0：激活， 1：停用
        LoginState,
        // 0：离线， 1：在线， 2：离开，3：隐身
        CreateAt,
        LastLogin,
        CommunityLevel,
        CurrentExp
    }){
        this.UserId = UserId;
        this.UserName = UserName;
        this.UserIcon = UserIcon;
        this.AccountPassword = AccountPassword;
        this.UserRole = UserRole;
        this.AccountState = AccountState;
        this.LoginState = LoginState;
        this.CreateAt = CreateAt;
        this.LastLogin = LastLogin;
        this.CommunityLevel = CommunityLevel;
        this.CurrentExp = CurrentExp;
    }
}

export default User;