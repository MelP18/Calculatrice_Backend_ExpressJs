const routes = require('../routes-list');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
  res.status(200).json(routes);
};