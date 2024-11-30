import { useNavigate } from 'react-router-dom';
import './postcell.css';
import { useEffect, useState } from 'react';

const PostCell = ({ post }) => {
    const navigate = useNavigate();
    const [images, setImages] = useState(null);
    const [author, setAuthor] = useState(null);

    const GetPostImages = async() => {
        const response = await fetch(
            `http://localhost:3001/post/getPostImages/${post.PostId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setImages(result.data);
        }
    }

    const GetPostAuthor = async() => {
        const response = await fetch(
            `http://localhost:3001/auth/getUserById/${post.AuthorId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setAuthor(result.data);
        }
    }

    useEffect(() => {
        GetPostImages();
        GetPostAuthor();
    }, [])

    return (
        <div className='PostCellContent' onClick={() => navigate(`/post/${post.PostId}`)}>
            <div className="PostCellLeft">
                <div className='PostAuthorIcon'>
                    {author && 
                        <img 
                            src={`http://localhost:3001/assets/user/${author.UserIcon}`}
                            style={{
                                borderRadius: '50%',
                                height: '60%'
                            }}
                        />}
                </div>
                <div className='PostCellTextData'>
                    <div className='PostCellPostTitle'>
                        {post.PostTitle}
                    </div>
                    <div className='PostCellAuhtorName'>
                        {author && author.UserName}
                    </div>
                </div>
                
            </div>
            
            <div className="PostCellRight">
                {images && images.map((item, index) => 
                    <div 
                        key={index} 
                        style={{
                            height: '100%', 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                    }}>
                        <img 
                            src={`http://localhost:3001/assets/posts/${item.FileName}`}
                            style={{maxWidth: '8vh', maxHeight: '8vh'}}
                        />
                    </div>
                )}
            </div>    
        </div>
    )
}

export default PostCell;