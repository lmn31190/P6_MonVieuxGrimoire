import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Create account
export const register = (req, res) => {
    // Hash password
    bcrypt.hash(req.body.password, 10)

      .then(hash => {

        const user = new User({
          email: req.body.email,
          password: hash
        });
        // Add MongoDB BDD
        user.save()
          .then(() => res.status(201).json({ message: 'Votre compte à bien été crée !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

// POST => Connexion
export const login = (req, res) => {
    // Vérify email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inconnue !' });
            }
            // Vérif password
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // if valid => return user.id & token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};