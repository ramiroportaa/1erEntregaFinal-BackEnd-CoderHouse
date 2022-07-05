export const authorizeMiddleware = (req, res, next)=>{
    const rol = req.headers["rol"];
    if (rol === "admin") return next();
    return res.status(401).json({ error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` });
};