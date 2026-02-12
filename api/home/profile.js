const authMiddleware = require('../../middleware/auth.middleware');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const user = await authMiddleware(req);
    if (!user) return res.status(401).json({ message: 'Non autorisé' });

    const avatarPath = path.join('..', 'avatars', user.avatar);
    res.status(200).json({ user, avatarPath });
  } catch (err) {
    console.error('GET /home/profile error:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
