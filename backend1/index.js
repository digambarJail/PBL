const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user.models')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://nk:niku@cluster0.tyby2uk.mongodb.net")

app.post('/register' , (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login' , (req , res) => {
    const {email, password} = req.body
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("User Does Not Exist!")
        }
    })
})
app.listen(3001 , () => {
    console.log("server is running")
})