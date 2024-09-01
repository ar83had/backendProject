import express from 'express'
import {router as movie} from './router/movie.mjs'
import {router as login} from './router/login.mjs'
import {expressjwt} from 'express-jwt';

const app = express();

app.use(express.json());

app.use("/movie/all",movie);
app.use("/login",login);
app.use(expressjwt({secret:"secret",algorithms:['HS256']}));
app.use((err,req,res,next)=>{
    if(err.name=="UnauthorizedError")
    {
        console.log(err);
        res.status(401);
        res.send("Unauthorized");
        res.end();
    }
    else
    {
        next();
    }
});

app.use("/movie",movie);

app.listen(2000,(err)=>{
    if(!err)
        console.log("Server connnected to port number 2000");
});