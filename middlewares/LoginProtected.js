export const LoginProtected = async (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) return next();
    const token = authHeader.split(" ")[1];
    if (token) {
        return (res.status(400).json("You are login"));
    }

    next();
}