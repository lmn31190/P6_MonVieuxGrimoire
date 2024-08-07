import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // Récupération du token
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token manquant' });
            
        }

        // Vérification du token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Ajout de l'ID utilisateur à la requête
        req.auth = { userId: decodedToken.userId };
        next();
    } catch (err) {
        res.status(401).json({ err: 'Requête non authentifiée' });
        console.log(err);
    }
};