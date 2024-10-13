import express from 'express';
import cors from 'cors';
import router from './router/index.mjs';

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extende:false}));

app.use("/",router);
app.use("/meme/auth",router)

app.use((err,req,res,next)=>{
    if(err.name=="UnauthorizedError"){
        console.log(err);
        res.send("UnauthorizedError");
    }
    res.end();
})



app.listen(2000,(err)=>{
    if(!err)
        console.log("Serever Started On port Number 2000");
    else
        console.log(err);
})


//use cors for get data from frontend