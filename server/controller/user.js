import User from "../models/user";
import { InsertUser, GetUserByUserName, UpdateUser } from "../Database";
import jwt from "jsonwebtoken";

export const createNewUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const user = new User(userInfo);
        const result = await InsertUser(user);

        if (result.code === 200) {
            res.status(200).json({ message: result.message, data: user });
        }
        else {
            res.status(result.code).json({ message: result.message });
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
        const {userName, password} = req.body;
        const user = await GetUserByUserName(userName);

        if(user){
            if(user.Password === password){
                const token = jwt.sign({UserId: user.UserId, UserName: user.UserName, UserRole: user.User}, "secret");

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