import express, { request, response } from 'express';
import {PORT,mongoURL} from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
const app=express();
app.use(express.json());
app.use(cors());
app.get('/',(request,response)=>{
   console.log(request)
return response.status(234).send('welcome to mern stack')
});
app.use('/books',booksRoute);
mongoose.connect(mongoURL)
.then(()=>{
console.log("app connected to database");
app.listen(PORT,()=>{
    console.log(`app listening to port : ${PORT}`);
});
})
.catch((error)=>{
console.log(error);
});
