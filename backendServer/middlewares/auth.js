import jwt from "jsonwebtoken";
import { User } from "../schema/userSchema.js";
async function auth(req, res, next) {
    try {
        const cookie = req.cookies.accessToken;
        const localUserData = req.headers.data
        let cookieOption = {
            httpOnly: true,
            secure: true,
        };


        if (cookie) {
            const verifyToken = jwt.verify(cookie, process.env.ACCESS_TOKEN_KEY);
            if (!verifyToken) {
                return res.status(401).json({ status: false, msg: 'Not Allowed to access resouces', result: "" });
            }


            let tokenUserId = verifyToken.id;

            if (localUserData) {
                const localUser = JSON.parse(localUserData);
                if (localUser) {
                    if (verifyToken.role !== localUser.role) {
                        res.clearCookie("accessToken", cookieOption)
                        return res.status(401).json({ status: false, msg: 'User not found', result: "" });
                    }
                    if (verifyToken.email !== localUser.email) {
                        return res.status(401).json({ status: false, msg: 'User not found', result: "" });

                    }

                    if (verifyToken.username !== localUser.username) {
                        return res.status(401).json({ status: false, msg: 'User not found', result: "" });

                    }
                }
            }


            const existUser = await User.findById(tokenUserId).select("-password");
            if (!existUser) {
                return res.status(401).json({ status: false, msg: 'User not found', result: "" });
            }

            req.user = existUser;
            next(); // 
        } else {
            return res.status(401).json({ status: false, msg: 'please login first', result: "" });

        }
    } catch (error) {
        res.status(401).json({ status: false, msg: error.message, result: "" })

    }


}

export { auth }