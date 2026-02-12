const userModel = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const mail = require('../../config/mail');

const generateRandomCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
};

module.exports = async function handler(req, res) {
    const reqFile = req.file;
    try {
        if (!reqFile) return res.status(400).send('Aucun fichier trouvé !');

        const fileName = reqFile.filename;
        const generateCode = generateRandomCode(10);
        const code = await bcrypt.hash(generateCode, 10);
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await new userModel({
            avatar: fileName,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            code: code
        }).save();

        mail.to(req.body.email).send(
            "Inscription",
            "Demande d'inscription! Votre code est: " + generateCode
        );

        res.status(201).send('Demande envoyée ! Veuillez consulter votre mail pour activer votre compte');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
