const bcrypt = require('bcrypt');
const jwt = require('sonwebtoken');

const User = require('../models/User');

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
        const user = await User.findByUsername(data.username);
        if(!user) {throw new Error("his user doesn't exist")}
        const match = await bcrypt.compare(data.password, user.password);

        if(match) {
            const load = {username: user.username}
            const sendToken = {err, token} => {
                res.status(200).json({
                success: true,
                token: token,
            });
            }

            jwt.sign(load, process.env.SECRET_TOKEN, { expiresIn: 3600}, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
      }
        } catch(err) {
            res.status(401).json({error: err.message});
        }
    }


    module.exports = {signup, login}