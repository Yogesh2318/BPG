import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateTokenAndSetCookie = (userId, res) => {
    dotenv.config();
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });
};
export default generateTokenAndSetCookie;