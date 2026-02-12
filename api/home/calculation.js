const authMiddleware = require('../../middleware/auth.middleware');
const CalculationModel = require('../../models/calculation.model');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const user = await authMiddleware(req);
    if (!user) return res.status(401).json({ message: 'Non autorisé' });

    const { calculation, date, hours } = req.body;
    if (!calculation || !date || !hours) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const newCalculation = await new CalculationModel({
      calculation,
      date,
      hours
    }).save();

    res.status(201).json({ message: "Calcul ajouté ✅", calculation: newCalculation });
  } catch (error) {
    console.error("POST /home/calculation error:", error);
    res.status(500).json({ message: error.message });
  }
};
