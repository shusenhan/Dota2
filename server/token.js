import jwt from 'jsonwebtoken';
import { GetUserByUserId } from './Database';

const ValidateToken = (token, isRefreshToken=false) => {
    try{
        const key = isRefreshToken ? process.env.REFRESH_JWT_SECRET : process.env.JWT_SECRET;
        const decode = jwt.verify(token, key);

        return { result: true, message:"令牌有效！", data: decode };
    }
    catch(error){
        if(error instanceof jwt.TokenExpiredError){
            return { result: false, message: "令牌过期！", detail: error.message };
        } 
        else if(error instanceof jwt.JsonWebTokenError){
            return { result: false, message: "令牌无效！", detail: error.message };
        } 
        else{
            return { result: false, message: "验证身份错误！", detail: error.message };
        }
    }
}

export const IsUserSelf = (token, userId) => {
    const valid = ValidateToken(token);

    if(valid.result){
        const decode = valid.data;

        if(decode.UserId === userId || decode.UserRole === "root admin"){
            return { result: true, message: "权限通过！"};
        }
        else{
            return { result: false, message: "没有权限！"};
        }
    }
    else{
        return { result: false, message: valid.message, detail: valid.detail}
    }
}

export const IsSuperAdmin = (token) => {
    const valid = ValidateToken(token);

    if(valid.result){
        const decode = valid.data;

        if(decode.UserRole === "root admin"){
            return { result: true, message: "权限通过！"};
        }
        else{
            return { result: false, message: "没有权限！"};
        }
    }
    else{
        return { result: false, message: valid.message, detail: valid.detail}
    }
}

export const IsAdmin = (token) => {
    const valid = ValidateToken(token);

    if(valid.result){
        const decode = valid.data;

        if(decode.UserRole === "admin"){
            return { result: true, message: "权限通过！"};
        }
        else{
            return { result: false, message: "没有权限！"};
        }
    }
    else{
        return { result: false, message: valid.message, detail: valid.detail}
    }
}

export const GenerateToken = (user, time=3600, time2='7d') => {
    // time单位：秒
    try{
        const token = jwt.sign({
            UserId: user.UserId,
            UserName: user.data.UserName, 
            UserRole: user.data.UserRole
        }, process.env.JWT_SECRET, { expiresIn: time});

        const refreshToken = jwt.sign({
            UserId: user.UserId,
        }, process.env.REFRESH_JWT_SECRET, { expiresIn: time2});
    
        return {result: true, message: "生成令牌成功！", token: [token, refreshToken]};
    }
    catch(error){
        return { success: false, message: "生成令牌错误！", detail: error.message };
    }
} 

export const RefreshToken = async (req, res) => {
    try{
        const { refreshToken } = req.body;
        const valid = ValidateToken(refreshToken, true);

        if(valid.result){
            const userId = valid.data.UserId;
            const result = await GetUserByUserId(userId);
            const user = result.data

            if (!user || !result) {
                return res.status(404).json({ result: false, message: "用户不存在！" });
            }

            const token = jwt.sign({
                UserId: user.UserId,
                UserName: user.UserName, 
                UserRole: user.UserRole
            }, process.env.JWT_SECRET, { expiresIn: 3600});

            res.status(200).json({token});
        }
        else{
            res.status(500).json({ result: false, message: valid.message, detail: valid.detail});
        }
    }
    catch(error){
        res.status(500).json({ result: false, message: "重新生成令牌错误！", detail: error.message});
    }
}