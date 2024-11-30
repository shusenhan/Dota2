import Community from '../models/community.js';
import { 
    CreateCommunity, 
    AddCommunityAdmin, 
    GetVisableCommunities, 
    GetCommunityById,
    GetCommunityAdmin, 
    GetUserByUserId
} from '../Database.js';

export const insertCommunity = async(req, res) => {
    try{
        const {CommunityName, CommunityIcon, CreatedDate, State, Description, CommunityAdmin} = req.body;
        const communityAdmin = CommunityAdmin;
        const community = new Community({CommunityName, CommunityIcon, CreatedDate, State, Description});
        const result = await CreateCommunity(community);

        if(result.code === 200){
            for (const item of communityAdmin) {

                const addAdminResult = await AddCommunityAdmin(result.data.CommunityId, item);

                if(addAdminResult.code !== 200){
                    res.status(500).json({message: addAdminResult.message});
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
};

export const getVisableCommuniteis = async(req, res) => {
    try{
        const result = await GetVisableCommunities();

        if (result.code === 200) {
            res.status(200).json({data: result.data});
        }
        else {
            res.status(result.code).json({ message: result.message });
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getCommunityById = async(req, res) => {
    try{
        const { communityId } = req.params;

        const result = await GetCommunityById(communityId);

        if (result.code === 200) {
            res.status(200).json({data: result.data});
        }
        else {
            res.status(result.code).json({ message: result.message });
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getCommunityAdmin = async(req, res) => {
    try{
        const { communityId } = req.params;

        const result = await GetCommunityAdmin(communityId);
        const adminIdList = result.data.map((item) => item.UserId);

        if (result.code === 200) {
            const adminsListPromises = adminIdList.map(id => GetUserByUserId(id));
            const adminsList = await Promise.all(adminsListPromises);

            res.status(200).json({data: adminsList.map(item => item.data)});
        }
        else {
            res.status(result.code).json({ message: result.message });
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}