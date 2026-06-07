import JWT from "jsonwebtoken"
export const LoginProtected = async (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) return next();

    try {
        JWT.decode(token, process.env.TOKEN_SECRET_KEY)
        return (res.status(400).json("You are already logged in"));
    }
    catch {
        next();
    }
}