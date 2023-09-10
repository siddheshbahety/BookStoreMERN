import express, { request, response } from 'express';
import {PORT,mongoURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';

const app=express();
app.use(express.json());
app.get('/',(request,response)=>{
   console.log(request)
return response.status(234).send('welcome to mern stack')
});
//route for saving a new book
app.post('/books',async(request,response)=>{
    try{
        if(!request.body.title||!request.body.author||!request.body.publishYear)
        {
            return response.status(400).send({
                message:'send all required fields :title,author,publish year',
            });
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);
     }
      catch(error)
      {
        console.log(error.message);
        response.status(500).send({message:error.message});
        }
    
});
//displaying all the books
app.get('/books',async(request,response)=>{
    try{
      const books=await Book.find({});
      return response.status(200).json({
        count:books.length,//displaying the total count of books
        data:books
      });
    }
    catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
    }
}

);
//updating a book 
app.put('books/:id',async(request,response)=>{
    try{
       if(!request.body.title||!request.body.author||!request.body.publishYear)
       {
        return response.status(400).send({
            message:"send all the fields ",
        });
       }
       const {id}=request.params;
       const result=await Book.findByIdAndUpdate(id,request.body);
       if(!result)
         {
             return response(404).json({message:"book not found"});
         }
        return response.status(200).send({message:"book updated successfully"});
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
}

);

//getting book by id
app.get('/books/:id',async(request,response)=>{
    try{
        const {id}=request.params;

      const book=await Book.findById(id);
      return response.status(200).json(book);
    }
    catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
    }
}

);
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
