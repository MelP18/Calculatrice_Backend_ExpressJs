// const calculationModel = require('../models/calculation.model')

// const addCalculation = async (req, res, next) =>{
//     //const user = await calculationModel.find().populate('users')
//     try{
//         const calculation = await new calculationModel({
//             id_calculation:req.body.id_calculation,
//             calculation:req.body.calculation,
//             date:req.body.date,
//             hours:req.body.hours,
//         }).save()
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// }

// const getCalculation = async (req, res, next) =>{
//     const calculation = await calculationModel.find()
//     console.log(calculation);
//     try{
//         if(calculation.length === 0){
//             res.status(400).send('Aucune Donnée !')
//         }else{
//             res.status(200).send(calculation)
//         }
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// }

// module.exports = {
//     addCalculation,
//     getCalculation
// }

const CalculationModel = require('../models/calculation.model');

// Ajouter une nouvelle calculation
const addCalculation = async (req, res, next) => {
  try {
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
    console.error("Add Calculation Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer toutes les calculations
const getCalculations = async (req, res, next) => {
  try {
    const calculations = await CalculationModel.find();

    if (calculations.length === 0) {
      return res.status(404).json({ message: "Aucune donnée trouvée" });
    }

    res.status(200).json(calculations);
  } catch (error) {
    console.error("Get Calculations Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCalculation,
  getCalculations
};
