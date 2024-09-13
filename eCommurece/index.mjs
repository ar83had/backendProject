import express from 'express';
import {router as auth} from './routes/authontication.mjs';
import {router as user} from './routes/user.mjs';
const app = express();

app.use(express.json());

app.use("/user",auth);
app.use("/product",user);

app.listen(2000,(err)=>{
    if(err)
        console.log(err);
    else
        console.log("Server started on port number 2000");
});