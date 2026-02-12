const authMiddleware = require('../../middleware/auth.middleware');
const CalculationModel = require('../../models/calculation.model');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const user = await authMiddleware(req);
    if (!user) return res.status(401).json({ message: 'Non autorisé' });

    const calculations = await CalculationModel.find();

    if (!calculations || calculations.length === 0) {
      return res.status(404).json({ message: "Aucune donnée trouvée" });
    }

    res.status(200).json(calculations);
  } catch (error) {
    console.error("GET /home/history error:", error);
    res.status(500).json({ message: error.message });
  }
};
