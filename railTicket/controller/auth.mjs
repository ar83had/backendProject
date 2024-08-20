import {storeUser} from '../model/railTicket.mjs';
import jwt from 'jsonwebtoken';


class User{
    #phoneNumber;#password;
    constructor(phoneNumber,password,req,res){
        this.#phoneNumber=phoneNumber;
        this.#password=password;
        this.req=req;
        this.res=res;
    }

    async generateToken(){
        return jwt.sign({"phoneNUmber":this.#phoneNumber},"hellouser");
    }

    async signUp(){
        let result = await storeUser(this.#phoneNumber,this.#password);
        
        if(!result){
            this.res.status(201);
            const token = await this.generateToken();
            this.res.json(token);
        }
        else if(result==11000)
        {
            this.res.status(400);
            this.res.json("User aleady sign up");
        }
        else
        {
            this.res.status(500);
            this.res.json("Server error");
        }
    }
}

async function signUp(req,res){
    const user = new User(req.body.phoneNumber,req.body.password,req,res);
    user.signUp();
}

export{signUp};