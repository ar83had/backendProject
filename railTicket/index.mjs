import express from 'express';
import {router} from './router/railTciket.mjs';
import {expressjwt} from 'express-jwt';

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/railway/booking",expressjwt({secret:"hellouser",algorithms:['HS256']}));
app.use("/railway",router);
app.use((err,req,res,next)=>{
    if(err.name==="UnauthorizedError"){
        res.status(401);
        res.send("Unauthorized");
        res.end();
    }
    else
        next();
})

app.listen(2000,(err)=>{
    if(!err){
        console.log("Server started on port number 2000");
    }
    else
        console.log(err);
})
