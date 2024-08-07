import jwt from 'jsonwebtoken';

// Middleware d'authentification
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
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée' });
    }
};
