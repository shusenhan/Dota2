import { useParams } from "react-router-dom";
import './communitypage.css';
import { useEffect, useState } from "react";
import Friend from "../../component/UserBox/Friend.jsx";
import CreatePost from "./createpost.jsx";
import PostCell from "./postcell.jsx";

const CommunityPage = () => {
    const {communityId} = useParams();
    const [community, setCommunity] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [posts, setPosts] = useState(null);
    const [classification, setClassification] = useState('date_a');

    const GetCommunityById = async() => {
        const response = await fetch(
            `http://localhost:3001/community/communityById/${communityId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setCommunity(result.data[0]);
        }
    };

    const GetCommunityAdmin = async() => {
        const response = await fetch(
            `http://localhost:3001/community/communityAdmin/${communityId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setAdmin(result.data);
        }
    };

    const GetCommunityPost = async() => {
        const response = await fetch(
            `http://localhost:3001/post/getPostsByCommunityId/${communityId}`,
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            const data = result.data;
            const sortedPosts = SortPosts(data, classification);
            setPosts(sortedPosts);
        }
    }

    const SortPosts = (posts, sortOrder) => {
        return posts.sort((a, b) => {
            const dateA = new Date(a.CreatedDate);
            const dateB = new Date(b.CreatedDate);
            return sortOrder === 'date_a' ? dateB - dateA : dateA - dateB;
        });
    }

    useEffect(() => {
        GetCommunityById();
        GetCommunityAdmin();
        GetCommunityPost();
    }, []);

    return(
        <div className="CommunityPageContent">
            <div className='CommunityPageNavbar'>

            </div>
            <div className='CommunityPagePostPart'>
                <div className='CommunityPageLeftPart'>
                    <div className='CommunityPageLeftPartTitle'>
                        <div className='CommunityPageLeftCommunityName'>{community && community.CommunityName}</div>
                        <div className='CommunityPageLeftPartTitleClassification'>
                            排序：
                            <select
                                onChange={(e) => {
                                    const newOrder = e.target.value;
                                    setClassification(newOrder);
                                    const sortedPosts = SortPosts(posts, newOrder);
                                    setPosts(sortedPosts);
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
                    <div className='CommunityPageLeftPartPosts'>
                        {posts && posts.map((item) => 
                            <PostCell post={item} key={item.PostId}/>
                        )}
                    </div>
                    <div className="CommunitPageLeftPartCreatePost">
                        <CreatePost CommunityId={communityId} refresh={GetCommunityPost}/>
                    </div>
                </div>
                <div className='CommunityPageRightPart'>
                    <div className="CommunityPageRightPartCommunityIcon">
                        {community && <img src={`http://localhost:3001/assets/commons/${community.CommunityIcon}`}
                            style={{
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />}
                    </div>

                    <div className="CommunityInfo">
                        <div style={{
                            color: 'white',
                            fontSize: '2vh',
                            marginTop: '6%'
                        }}>管理员</div>
                        <div className="CommunityInfoAdmin">
                            {admin && admin.map((item, index) => 
                                <Friend key={index} friend={item} height="5.5vh"></Friend>
                            )}
                        </div>
                        <div className="CommunityInfoDescription">
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;