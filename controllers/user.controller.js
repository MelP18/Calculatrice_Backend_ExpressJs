const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const mail = require('../config/mail')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateRandomCode = (length)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}
const registration = async (req, res, next) => {
    const reqFile = req.file
    try {
        if (!reqFile) {
            res.status(400).send('Aucun fichier trouvé !')
        } else {

            const fileName = reqFile.filename
            const generateCode = generateRandomCode(10)
            const code = await bcrypt.hash(generateCode, 10)
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await new userModel({
                avatar: fileName,
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                code:code
                
            }).save()
            
            mail.to(req.body.email).send("Inscription", "Demande d'inscription! Votre code est: " + generateCode)
            res.status(201).send('Demande envoyez ! Veuillez consulter votre mail pour activer votre compte')
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
const verifyCode = async (req, res, next) =>{
    const {email,code} = req.body

    try{
        const userEmail = await userModel.findOne({email})
        if(!userEmail){
            res.status(400).send('Donnée indisponible !')
        }else{
           if(userEmail && bcrypt.compareSync(code, userEmail.code)){
                const userActivate = await userEmail.updateOne({
                    email_verified: true,
                    email_verified_at: Date.now()
                })
                return res.status(200).send('Compte Activé avec Succès !')
           }else{
                res.status(400).send('Code Erroné !')
           }
        }
    }catch(error){
        res.status(500).json({ message: error })
    }
}
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60000s' });
}
const connection = async (req, res, next) =>{
    const {email, password} = req.body
    try{
        const userData = await userModel.findOne({email})
        if(userData && userData.email_verified == true){
            if(userData && bcrypt.compareSync(password, userData.password)){
                const accessToken = generateAccessToken(userData.toObject())
                res.status(200).send(accessToken)
            }else{
                res.status(400).send('Mot de passe incorrect')
            }
        }else{
            res.status(400).send('Donnée Invalid/Compte non activé !')
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    registration,
    connection,
    verifyCode
}