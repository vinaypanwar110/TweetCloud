import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, //millisec
		sameSite: "none", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV === "production",
		domain: process.env.NODE_ENV === "production" ? '.onrender.com' : 'localhost'
	});
};