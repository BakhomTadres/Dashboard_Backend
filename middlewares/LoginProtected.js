import JWT from "jsonwebtoken"
export const LoginProtected = async (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) return next();
    
    const token = authHeader.split(" ")[1];
    if (!token) return next();

    try {
        JWT.verify(token, process.env.TOKEN_SECRET_KEY);
        return res.status(400).json({ message: "You are already logged in" });
    } catch {
        next(); 
    }
}