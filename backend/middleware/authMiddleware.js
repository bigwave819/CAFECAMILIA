import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

const requireAuth = async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: "No aauthorization token found" });
        }

        const token = authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            let user = await User.findById(decoded.id).select("_id role");

            if (!user) {
                return res.status(401).json({ message: "Unauthorized: user not found" });
            }

            req.user = user;
            req.role = user.role;
            return next();

        } catch (error) {
        console.error(error);        
        return res.status(500).json({
            message: " :Invalid or expiredToken",
        });
    }
};

export default requireAuth;