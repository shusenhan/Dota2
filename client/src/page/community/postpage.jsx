import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Friend from "../../component/UserBox/Friend.jsx";
import './postpage.css';
import Floor from "./floor.jsx";
import CreateComment from "./createcomment.jsx";

const PostPage = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [classification, setClassification] = useState('date_a');

    const GetPost = async() => {
        const response = await fetch(
            `http://localhost:3001/post/getPostById/${postId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setPost(result.data);
        }
    }

    const GetComments = async() => {
        const response = await fetch(
            `http://localhost:3001/post/getPostComments/${postId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            const data = result.data;
            const sortedComments = SortComments(data, classification);
            setComments(sortedComments);
        }
    }

    const SortComments = (comments, sortOrder) => {
        return comments.sort((a, b) => {
            const dateA = new Date(a.CreatedDate);
            const dateB = new Date(b.CreatedDate);
            return sortOrder === 'date_a' ? dateB - dateA : dateA - dateB;
        });
    }

    useEffect(() => {
        GetPost();
        GetComments();
    }, []);

    return(
        <div className="PostPageContent">
            <div className='PostPageNavbar'>

            </div>
            <div className='PostPageCommentPart'>
                <div className='PostPageLeftPart'>
                    <div className='PostPageLeftPartTitle'>
                        <div className='PostPageLeftPostTitle'>{post && post.PostTitle}</div>
                        <div className='PostPageLeftPartTitleClassification'>
                            排序：
                            <select
                                onChange={(e) => {
                                    const newOrder = e.target.value;
                                    setClassification(newOrder);
                                    const sortedComments = SortComments(comments, newOrder);
                                    setComments(sortedComments);
                                }}
                                style={{
                                    width: '48%',
                                    height: '70%',
                                    backgroundColor: 'rgb(40, 40, 40)',
                                    marginLeft: '2%',
                                    color: 'rgb(160, 160, 160)',
                                    fontSize: '1.75vh'
                            }}>  
                                <option value="date_a">发布时间顺序</option> 
                                <option value="date_d">发布时间逆序</option> 
                            </select>
                        </div>
                    </div>
                    <div className='PostPageLeftPartComments'>
                        <div className="PostPagePostContent">
                            {post && <Floor postId={post.PostId} text={post.PostContent} date={post.CreatedDate} authorId={post.AuthorId}/>}
                            {comments && comments.map((item, index) => 
                                <Floor key={item.CommentId} postId={item.PostId} commentId={item.CommentId} text={item.CommentContent} date={item.CreatedDate} authorId={item.AuthorId}/>
                            )}
                        </div>
                    </div>
                    <div className="PostPageLeftPartCreateComment">
                        <CreateComment postId={postId} refresh={GetComments}/>
                    </div>
                </div>
                <div className='CommunityPageRightPart'>
                    <div className="CommunityInfo">
                        <div style={{
                            color: 'white',
                            fontSize: '2vh',
                            marginTop: '6%'
                        }}>管理员</div>
                        <div className="CommunityInfoAdmin">
                            
                        </div>
                        <div className="CommunityInfoDescription">
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;