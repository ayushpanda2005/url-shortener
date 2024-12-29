const express = require("express")
const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose")
const { connectMDB } = require("./connection") ;
const User = require("./models/user") ;
const userRouter = require("./routes/user") ;

//const fs = require("fs")

const app = express() 
app.use(express.json())

const PORT = 8005

app.use(express.urlencoded({ extended: false })) ;

//mongodb

//Connection

connectMDB('mongodb://127.0.0.1:27017/yt-app-01').then(() => console.log("connected !")) ;

//app.route
app.use("/api/user",userRouter) ;

app.listen(PORT , () => console.log(`Server started at port ${PORT}`))