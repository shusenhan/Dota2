import Post from "../models/Post.js";
import Comment from "../models/comment.js";
import { 
    CreateNewPost, 
    InsertImageName, 
    GetPostsByCommunityId, 
    GetPostImages, 
    GetPostById,
    CreateNewComment,
    GetPostComments,
    GetCommentImages
} from "../Database.js";
import { ValidateToken } from "../token.js";

export const createNewPost = async(req, res) => {
    try{
        const { PostTitle,CommunityId, PostContent, AuthorId, CreatedDate, State, FilesName } = req.body;
        const post = new Post({PostTitle, CommunityId, PostContent, AuthorId, CreatedDate, State});

        console.log(req.body)

        const token = req.headers.authorization.split(" ")[1];
        const validateResult = ValidateToken(token);

        if(!validateResult.result){
            res.status(401).json({message: validateResult.message});
            return;
        }

        const result = await CreateNewPost(post);

        if(result.code === 200){
            if(FilesName instanceof Array){
                for(const fileName of FilesName){
                    const insertFileNameResult = await InsertImageName(result.data.PostId, 0, fileName);
    
                    if(insertFileNameResult.code !== 200){
                        res.status(500).json({message: insertFileNameResult.message});
                        return;
                    }
                }
            }
            else if(FilesName && FilesName !== 'null'){
                const insertFileNameResult = await InsertImageName(result.data.PostId, 0, FilesName);
                
                if(insertFileNameResult.code !== 200){
                    res.status(500).json({message: insertFileNameResult.message});
                    return;
                }
            }
            
            res.status(200).json({message: result.message});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getPostsByCommunityId = async(req, res) => {
    try{
        const communityId = req.params.communityId;

        const result = await GetPostsByCommunityId(communityId);

        if(result.code === 200){
            res.status(200).json({message: result.message, data: result.data});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getPostImages = async(req, res) => {
    try{
        const postId = req.params.postId;

        const result = await GetPostImages(postId);

        if(result.code === 200){
            res.status(200).json({message: result.message, data: result.data});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getPostById = async(req, res) => {
    try{
        const postId = req.params.postId;

        const result = await GetPostById(postId);

        if(result.code === 200){
            res.status(200).json({message: result.message, data: result.data});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const createNewComment = async(req, res) => {
    try{
        const { CommentContent,PostId, AuthorId, CreatedDate, State, FilesName } = req.body;
        const comment = new Comment({PostId, AuthorId, CommentContent, CreatedDate, State});

        console.log(comment)
        const result = await CreateNewComment(comment);
        console.log(FilesName)

        if(result.code === 200){
            console.log('1')
            if(FilesName instanceof Array){
                for(const fileName of FilesName){
                    const insertFileNameResult = await InsertImageName(PostId, result.data.CommentId, fileName);
    
                    if(insertFileNameResult.code !== 200){
                        res.status(500).json({message: insertFileNameResult.message});
                        return;
                    }
                }
            }
            else if(FilesName && FilesName !== 'null'){
                const insertFileNameResult = await InsertImageName(PostId, result.data.CommentId, FilesName);
                
                if(insertFileNameResult.code !== 200){
                    res.status(500).json({message: insertFileNameResult.message});
                    return;
                }
            }
            
            res.status(200).json({message: result.message});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getPostComments = async(req, res) => {
    try{
        const postId = req.params.postId;

        const result = await GetPostComments(postId);

        if(result.code === 200){
            res.status(200).json({message: result.message, data: result.data});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getCommentImages = async(req, res) => {
    try{
        const {postId, commentId} = req.params;

        const result = await GetCommentImages(postId, commentId);

        if(result.code === 200){
            res.status(200).json({message: result.message, data: result.data});
        }
        else{
            res.status(result.code).json({message: result.message});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}