import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const protectRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: "Not authorized, token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized, token invalid" });
    }   
};
export default protectRoute;