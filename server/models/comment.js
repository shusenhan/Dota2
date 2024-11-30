class Comment {
    constructor({
        CommentId,
        // 层数
        PostId,
        AuthorId,
        CommentContent,
        CreatedDate,
        State
        // 0 不可见
        // 1 正常
    }){
        this.CommentId = CommentId;
        this.PostId = PostId;
        this.CommentContent = CommentContent;
        this.AuthorId = AuthorId;
        this.CreatedDate = CreatedDate;
        this.State = State;
        // 
    }
};

export default Comment;