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

export const register = async (req, res) => {
    try {
        const {UserName, AccountPassword} = req.body;

        const isExist = await GetUserByUserName(UserName);

        if(isExist.code === 200){

            res.status(409).json({ message: '用户已存在！'});
        }
        else{
            const userInfo = {
                UserName,
                UserIcon: "UserDefaultIcon.jpg",
                AccountPassword,
                UserRole: 'user',
                AccountState: 0,
                LoginState: 0,
                CreateAt: new Date(),
                CommunityLevel: 1,
                CurrentExp: 0
            };
    
            const user = new User(userInfo);
            const result = await InsertUser(user);
    
            if (result.code === 200) {
                res.status(200).json({ message: result.message, data: user });
            }
            else {
                res.status(result.code).json({ message: result.message });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserByUserName = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await GetUserByUserName(userName);

        if (user) {
            res.status(200).json({ data: user });
        }
        else {
            res.status(404).json({ message: "没有发现用户" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const updateUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const user = new User(userInfo);

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");

        if (decoded.UserId !== user.UserId || decoded.UserRole !== "super admin") {
            res.status(401).json({ message: "没有权限修改用户信息！" });
            return;
        }
        
        const result = await UpdateUser(user, user.UserId);

        if (result.code === 200) {
            res.status(200).json({ message: result.message });
        }
        else {
            res.status(result.code).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {
    try{
        const {UserName, AccountPassword} = req.body;
        const password = await UserLogin(UserName);

        if(password){
            if(password.data.AccountPassword === AccountPassword){
                const user = await GetUserByUserName(UserName);
                const token = jwt.sign({UserId: user.data.UserId, UserName: user.data.UserName, UserRole: user.data.UserRole}, "secret");

                res.status(200).json({message: "登录成功", data: user, token: token});
            }
            else{
                res.status(401).json({message: "密码错误"});
            }
        }
        else{
            res.status(404).json({message: "用户不存在"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getUserFriendList = async (req, res) => {
    try{
        const {userName} = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");

        if(decoded.UserName !== userName){
            res.status(401).json({message: "没有权限查看该用户的好友列表"});
        }
        else{
            const result = await GetUserFriendList(userName);
            const friendships = result.data;
            let friends = [];

            for(const friendship of friendships){
                const friendName = friendship.User1 === userName ? friendship.User2 : friendship.User1;
                const result2 = await GetUserByUserName(friendName);
                const friend = result2.data;
                friends.push(friend);
            }

            if(friends){
                res.status(200).json({data: friends});
            }
            else{
                res.status(404).json({message: "还没有好友"});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const searchUser = async (req, res) => {
    try{
        const {userName} = req.params;
        const users = await SearchUser(userName);

        if(users){
            res.status(200).json({data: users.data});
        }
        else{
            res.status(404).json({message: "没有找到用户!"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const searchUserByLike = async (req, res) => {
    try{
        const {userName} = req.params;
        const users = await SearchUserByLike(userName);

        if(users){
            res.status(200).json({data: users.data});
        }
        else{
            res.status(404).json({message: "没有找到用户!"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const isFriend = async (req, res) => {
    try{
        const {user1, user2} = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");

        if(decoded.UserName !== user1 && decoded.UserName !== user2){
            res.status(401).json({message: "没有权限查看该用户的好友状态！"});
        }
        else{
            const result = await IsFriend(user1, user2);

            if(result){
                res.status(200).json({data: result});
            }
            else{
                res.status(404).json({message: "没有好友关系"});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const setFriendShip = async (req, res) => {
    try{
        const {user1, user2} = req.body;
        const friendship = new FriendShip({
            User1: user1,
            User2: user2,
            State: 0
        });

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");

        console.log(decoded)
        console.log(req.body)

        if(decoded.UserName !== user1){
            res.status(401).json({message: "没有权限添加好友"});
        }
        else{
            const result = await SetFriendShip(friendship);

            if(result.code === 200){
                res.status(200).json({message: result.message});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const confirmFriendShip = async (req, res) => {
    try{
        console.log('---------------1-------------------')
        const {user1, user2} = req.body;
        const friendship = new FriendShip({
            User1: user1,
            User2: user2,
            State: 1
        });

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");

        console.log('token:',decoded)
        console.log('user2:',user2)

        if(decoded.UserName !== user2){
            res.status(401).json({message: "没有权限确认好友请求"});
        }
        else{
            const result = await ConfirmFriendShip(friendship);

            if(result.code === 200){
                res.status(200).json({message: result.message});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const deleteFriendShip = async (req, res) => {
    try{
        const {user1, user2} = req.body;
        const friendship = new FriendShip({
            User1: user1,
            User2: user2,
            State: 0
        });

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");

        if(decoded.UserName !== user1 && decoded.UserName !== user2){
            res.status(401).json({message: "没有权限删除好友"});
        }
        else{
            const result = await DeleteFriendShip(friendship);

            if(result.code === 200){
                res.status(200).json({message: result.message});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getUserByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await GetUserByUserId(userId);

        if (user) {
            res.status(200).json({ data: user.data });
        }
        else {
            res.status(404).json({ message: "没有发现用户" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}