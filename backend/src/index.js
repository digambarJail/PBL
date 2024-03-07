import express, { json } from "express"
import { connect } from "mongoose"
import cors from "cors"
import { User } from './models/user.models.js'
// import {findOne, createOne} from 
// import { hash as _hash, compare } from 'bcrypt'
import bcrypt from 'bcrypt'
// const bcrypt = require("bcrypt");
import connectDB from "./db/index.js";
import { ApiError } from "./utils/ApiError.js"
import {app} from './app.js'



// const app = express()
// app.use(json())
// app.use(cors())

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

// app.post('/register', async (req,res) => {
//     try {
//         const {name, email, password} = req.body;
        
//         // const userExist = await User.findOne({email:email}); // When using findOne always use await
        
//         // if(userExist)
//         // {
//         //     console.log('user exists')
//         //     return res.status(400).json({msg:"Exists"});
//         // }

//         // const hash_pass = await bcrypt.hash(password,10);

//         const existedUser = await User.findOne({ email })

//         if (existedUser) {
//             throw new ApiError(409, "User with email already exists")
//         }

//         const user = await User.create({name, email, password})

//         res.status(201).json(user);
//     } catch (error) {
//         console.log("Outside try block",error)
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase
//         const user = await User.findOne({ email: normalizedEmail });
        
//         if (!user) {
//             return res.status(404).json('User Does Not Exist!');
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             res.json('Login Successful!');
//         } else {
//             res.status(401).json('The password is incorrect');
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(3001 , () => {
//     console.log("server is running")
// })