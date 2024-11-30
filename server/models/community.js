class Community {
    constructor({
        CommunityId,
        CommunityName,
        CommunityIcon,
        CreatedDate,
        State,
        // 0隐藏
        // 1正常
        // 2停用，不能发表和修改
        Description
    }){
        this.CommunityId = CommunityId;
        this.CommunityName = CommunityName;
        this.CommunityIcon = CommunityIcon;
        this.CreatedDate = CreatedDate;
        this.State = State;
        this.Description = Description;
    }
}

export default Community;