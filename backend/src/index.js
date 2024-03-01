import express, { json } from "express"
import { connect } from "mongoose"
import cors from "cors"
import { User } from './models/user.models.js'
// import {findOne, createOne} from 
import { hash as _hash, compare } from 'bcrypt'
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




app.post('/register' , (req, res) => {
    const {name, email, password} = req.body;
    _hash(password , 10)
    .then(hash => {
        create({name , email , password: hash})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({error: err.message}));
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/login',async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email: email })
        .then(user => {
            if (user) {
                compare(password, user.password, (err, result) => {
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



app.listen(3001 , () => {
    console.log("server is running")
})