import express from 'express'
import {router as quote} from './router/quote.mjs'
import {expressjwt} from 'express-jwt';

const app = express();

app.use(express.json());

app.use("/quote/auth",quote);

app.use("/quote",expressjwt({secret:"hellouser",algorithms:['HS256']}),quote);
app.use((err,req,res,next)=>{
    if(err.name=="UnauthorizedError"){
        console.log("Unauthorized");
        res.status(401);
        res.send("Unauthorized");
        res.end();
    }
    else
        next();
});

app.listen(2000,(err)=>{
    if(!err){
        console.log("Server Started on port number 2000");
    }
});