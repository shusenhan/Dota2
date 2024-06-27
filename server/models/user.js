class User {
    constructor({
        UserId,
        UserName,
        UserIcon,
        AccountPassword,
        UserRole,
        AccountState,
        LoginState,
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