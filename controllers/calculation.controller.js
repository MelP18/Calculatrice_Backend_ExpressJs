const calculationModel = require('../models/calculation.model')

const addCalculation = async (req, res, next) =>{
    //const user = await calculationModel.find().populate('users')
    try{
        const calculation = await new calculationModel({
            id_calculation:req.body.id_calculation,
            calculation:req.body.calculation,
            date:req.body.date,
            hours:req.body.hours,
        }).save()
    }catch(error){
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

const getCalculation = async (req, res, next) =>{
    const calculation = await calculationModel.find()
    console.log(calculation);
    try{
        if(calculation.length === 0){
            res.status(400).send('Aucune Donnée !')
        }else{
            res.status(200).send(calculation)
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addCalculation,
    getCalculation
}