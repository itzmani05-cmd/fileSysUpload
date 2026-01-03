const express= require('express');
const bcrypt= require('bcryptjs');
const {users, sessions}= require('../store');
const {v4: uuid}= require('uuid');

const router= express.Router();

router.post('/register', async(req,res)=>{
    const {email, password}= req.body;
    if(users.find(u=> u.email==email)){
        return res.status(400).json({message: "User already exists"});
    }
    const user={
        id:uuid(),
        email,
        password: await bcrypt.hash(password, 10),
    };

    users.push(user);
    res.json({message:"Registered successfully"});
})

router.post('/login', async(req,res)=>{
    const {email, password}= req.body;
    const user= users.find(u=> u.email==email);
    if(!user){
        return res.status(400).json({message: "Invalid email or password"});
    }
    const ok= await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).json({message: "Invalid email or password"});
    }
    const token= uuid();
    sessions[token]= user.id;
    res.json({token});
})

module.exports= router;