import express, { json } from "express"
import { connect } from "mongoose"
import cors from "cors"
import { User } from './models/user.models.js'
// import {findOne, createOne} from 
// import { hash as _hash, compare } from 'bcrypt'
import bcrypt from 'bcrypt'
// const bcrypt = require("bcrypt");
import connectDB from "./db/index.js";


const app = express()
app.use(json())
app.use(cors())

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT} `)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed", err);
})
/*
app.post('/register' , (req, res) => {
    const {username, email, password} = req.body;
    _hash(password , 10)
    .then(hash => {
        User.create({username , email , password: hash})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({error: err.message}));
    })
    .catch(err => res.status(500).json({error: err.message}));
});
*/

app.post('/register', async (req,res) => {
    try {
        const {name, email, password} = req.body;
        
        // const userExist = await User.findOne({email:email}); // When using findOne always use await
        
        // if(userExist)
        // {
        //     console.log('user exists')
        //     return res.status(400).json({msg:"Exists"});
        // }

        const hash_pass = await bcrypt.hash(password,10);

        const user = await User.create({name, email, password:hash_pass})

        res.status(201).json(user);
    } catch (error) {
        console.log("Outside try block",error)
    }
});

/*
app.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json('An error occurred while comparing passwords.');
                    } else if (result) {
                        res.json('Success');
                    } else {
                        res.json('the password is incorrect');
                    }
                });
            } else {
                res.json('User Does Not Exist!');
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
*/

app.post('/login', async(req,res) =>{
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email: email});

        if(!userExist)
        {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const user = await bcrypt.compare(password, userExist.password);

        if(user){
            res.status(200).json({
                msg: "Login Successful!",
                // token: await userExist.generateToken(),
                // userId: userExist._id.toString()
            })
        }
        else{
            res.status(401).json({message: "Invalid email/pass"});
        }

    } catch (error) {
        res.status(400).json("Internal server error",error)
    }
})


app.listen(3001 , () => {
    console.log("server is running")
})