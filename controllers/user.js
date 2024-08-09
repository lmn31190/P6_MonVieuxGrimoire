import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Create account
export const register = async (req, res) => {
    try {
        // Chiffrement du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        // Enregistrement dans la base de données MongoDB
        await newUser.save();
        res.status(201).json({ message: 'Votre compte a été créé avec succès !' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Erreur de validation des données', details: err });
        } else {
            res.status(500).json({ error: 'Erreur lors de la création du compte', details: err });
        }
    }
};

// POST => Connexion
export const login = async (req, res) => {
    try {
       
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }

        
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe invalide !' });
        }

        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({
            userId: user._id,
            token
        });
    } catch (err) {
        res.status(500).json({ err });
    }
};
