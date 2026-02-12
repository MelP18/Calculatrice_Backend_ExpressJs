const userModel = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60000s' });
};

module.exports = async function handler(req, res) {
    const { email, password } = req.body;

    try {
        const userData = await userModel.findOne({ email });

        if (!userData || userData.email_verified !== true) {
            return res.status(400).send('Donnée invalide / Compte non activé !');
        }

        if (!bcrypt.compareSync(password, userData.password)) {
            return res.status(400).send('Mot de passe incorrect');
        }

        const accessToken = generateAccessToken(userData.toObject());
        res.status(200).send(accessToken);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
