import JWT from "jsonwebtoken"
export const verifyToken = async (req, res, next) => {
    const authHaader = req.headers["Authorization"] || req.headers["authorization"];

    if (!authHaader) {
        return res.status(401).json("Token is required");
    }
    const token = authHaader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log(decoded)
    req.user = decoded;
    next();
}