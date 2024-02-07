const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const connectDB= async ()=>{
    try {
        mongoose.connect(process.env.db)
        console.log("db connected")
    } catch (error) {
        console.log("error",error)
    }
}


module.exports = connectDB;