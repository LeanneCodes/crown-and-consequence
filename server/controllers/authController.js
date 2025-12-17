const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const console = require('node:console');

async function signup(req, res) {
    const data = req.body;
    try{
//Generate salt to add a random string to the password
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
     //hash the password
     data["password"] = await bcrypt.hash(data.password, salt);
    //  console.log(data)
    const result = await User.create(data)
    res.status(201).send(result);
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


async function login(req, res) {
    const data = req.body;
    try{
        const user = await User.findByEmail(data.email);
        if(!user) {throw new Error("This user doesn't exist")}
        const match = await bcrypt.compare(data.password, user.password);

        if(match) {
            const load = {email: user.email}
            const sendToken = (err, token) => {
                if(err){
                    return res.status(500).json({error: "Token generating failed"})
                }
                res.status(200).json({
                success: true,
                token: token,
            });
            }

            jwt.sign(load, process.env.SECRET_TOKEN, { expiresIn: 5000}, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
      }
        } catch(err) {
            res.status(401).json({error: err.message});
        }
    

    async function deleteAccount(req, res) {
    const data = req.body;

    //no need to generate a new token as user is already logged in
    try{
        const user = await User.findByEmail(data.email);
        if(!user) {throw new Error("This user doesn't exist")}
        const match = await bcrypt.compare(data.password, user.password);

        if(match) {
                await User.deleteByEmail(user.email)

                res.status(200).json({
                success: true,
                message: "Account Deleted",
            });
            }
        } catch(err) {
            res.status(401).json({error: err.message});
        }}

        // async function changePassword(req, res){
        //     const data = req.body;
        //     console.log(data)
        //     try{
        //         const user = await User.findByEmail(user.email)
        //         if (!newPassword) {
        //      return res.status(400).json({ error: "New password is required" });
        //     }  
        // }catch (err){
        //     res.status(401).json({error: err.message})
        // }}
    

    module.exports = {signup, login, deleteAccount, changePassword}
