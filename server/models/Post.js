class Post {
    constructor({
        PostId,
        CommunityId,
        PostTitle,
        PostContent,
        AuthorId,
        CreatedDate,
        State
        // 0 不可见
        // 1 正常
        // 2 锁定
    }){
        this.PostId = PostId;
        this.CommunityId = CommunityId;
        this.PostTitle = PostTitle;
        this.PostContent = PostContent;
        this.AuthorId = AuthorId;
        this.CreatedDate = CreatedDate;
        this.State = State;
    }
}

export default Post;