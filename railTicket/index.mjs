import express from 'express';
import {router} from './router/railTciket.mjs';

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/railway",router);

app.listen(2000,(err)=>{
    if(!err){
        console.log("Server started on port number 2000");
    }
    else
        console.log(err);
})
