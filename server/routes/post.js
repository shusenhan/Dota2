import express from 'express';
import { 
    createNewPost, 
    getPostsByCommunityId, 
    getPostImages, 
    getPostById, 
    createNewComment,
    getPostComments,
    getCommentImages
 } from '../controller/post.js';

const postRouter = express.Router();

postRouter.post('/create', createNewPost);
postRouter.get('/getPostsByCommunityId/:communityId', getPostsByCommunityId);
postRouter.get('/getPostImages/:postId', getPostImages);
postRouter.get('/getPostById/:postId', getPostById);
postRouter.post('/createComment', createNewComment);
postRouter.get('/getPostComments/:postId', getPostComments);
postRouter.get('/getCommentImages/:postId/:commentId', getCommentImages);

export default postRouter;