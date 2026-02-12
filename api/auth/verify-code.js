const userModel = require('../../models/user.model');
const bcrypt = require('bcryptjs');

module.exports = async function handler(req, res) {
    const { email, code } = req.body;

    try {
        const userEmail = await userModel.findOne({ email });
        if (!userEmail) return res.status(400).send('Donnée indisponible !');

        if (bcrypt.compareSync(code, userEmail.code)) {
            await userEmail.updateOne({
                email_verified: true,
                email_verified_at: Date.now()
            });
            return res.status(200).send('Compte Activé avec Succès !');
        } else {
            return res.status(400).send('Code Erroné !');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
