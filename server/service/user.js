import User from "../models/user.js";
import FriendShip from "../models/firendlist.js";
import { 
    InsertUser, 
    GetUserByUserName, 
    UpdateUser, 
    GetUserFriendList, 
    SearchUser,
    IsFriend,
    SetFriendShip,
    DeleteFriendShip,
    ConfirmFriendShip,
    SearchUserByLike,
    GetUserByUserId,
    UserLogin
} from "../Database.js";
import jwt from "jsonwebtoken";
import { GenerateToken, GenerateRefreshToken, RefreshToken } from "../token.js";

const UserService = {
    async Login(username) {
        return await UserLogin(username);
    },
    async CheckUserExist(username){
        return await GetUserByUserName(username);
    },
    async Register(userInfo){
        const user = new User(userInfo);
        return await InsertUser(user);
    },
    CreateToken(user){
        return GenerateToken(user);
    },
    CreateRefreshToken(user){
        return GenerateRefreshToken(user);
    },
    async CheckUserIdExist(userId){
        return await GetUserByUserId(userId);
    },
};

export default UserService;
