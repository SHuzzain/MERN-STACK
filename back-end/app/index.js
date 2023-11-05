import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './api/routes/user.route.js';

dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => {
        console.log('Connection successfully established');
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

const app = express()

app.use('/api/user', router);

app.listen('3000', () => {
    console.log('hi and hello localhost:3000')
})

