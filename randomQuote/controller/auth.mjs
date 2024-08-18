import jwt from 'jsonwebtoken';

class Token{
    #data;

    set data(info){
        this.#data=info;
    }

    async getToken(){
        console.log(this.#data);
        let token = jwt.sign(this.#data,"hellouser");
        return token;
    }
}

export {Token}