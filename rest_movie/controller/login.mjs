import jwt from 'jsonwebtoken';
import {fn as model} from '../model/login.mjs'

async function login(req,res){
    try{
        const credentials = {
            "username":req.body.username,
            "password":req.body.password
        }
    
        const user = await model.get(credentials);
    
        if(user)
        {
            delete user.password;
            const token = jwt.sign(user,"secret");
            res.json({"token":token});
        }
        else
        {
            res.status(401);
            res.send("Unauthorized ");
        }
        res.end();
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Unauthorized !");
        res.end();
    }
}



export{login};