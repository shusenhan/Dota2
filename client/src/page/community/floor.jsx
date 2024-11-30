import { useEffect, useState } from "react";
import Friend from "../../component/UserBox/Friend.jsx";

const Floor = ({postId, commentId=0, text, date, authorId}) => {
    const [author, setAuthor] = useState(null);
    const [images, setImages] = useState(null);

    const GetPostAuthor = async() => {
        const response = await fetch(
            `http://localhost:3001/auth/getUserById/${authorId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setAuthor(result.data);
        }
    }

    const GetPostImages = async() => {
        const response = await fetch(
            `http://localhost:3001/post/getPostImages/${postId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setImages(result.data);
        }
    }

    const GetCommentImages = async() => {
        const response = await fetch(
            `http://localhost:3001/post/getCommentImages/${postId}/${commentId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();
        console.log(result);
        if(response.status === 200){
            setImages(result.data);
        }
    }

    useEffect(() => {
        if(commentId === 0){
            GetPostImages();
        }
        else{
            GetCommentImages();
        }
        GetPostAuthor();
    }, [])

    return(
        <div style={{
            margin: '2% 2%',
            backgroundColor: 'rgb(100, 100, 100)',
            borderRadius: '8px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div style={{margin: '0.5% 1%'}}>
                    {author && <Friend friend={author} height="6vh"/> }
                </div>
                <div style={{margin: '2%', fontSize: '1.5vh'}}>
                    创建于{date}
                </div>
            </div>
            <div style={{textAlign: 'start', padding: '1% 1% 1% 5%', fontSize: '1.75vh'}}>
                {text}
            </div>
            <div>
                {images && images.map((item, index) => 
                    <div key={index} style={{display: 'flex', justifyContent: 'start'}}>
                        <img src={`http://localhost:3001/assets/posts/${item.FileName}`}
                            style={{
                                margin: '1.5% 5%',
                                maxHeight: '25vh',
                                maxWidth: '25vh'
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Floor;