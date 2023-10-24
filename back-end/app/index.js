import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => {
        console.log('Connection successfully established');
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

const app = express()



app.listen('3000', () => {
    console.log('hi and hello')
})