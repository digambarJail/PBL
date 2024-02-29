const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user.models')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://nk:niku@cluster0.tyby2uk.mongodb.net")

app.post('/register' , (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password , 10)
    .then(hash => {
        UserModel.create({name , email , password: hash})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({error: err.message}));
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
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



app.listen(3001 , () => {
    console.log("server is running")
})