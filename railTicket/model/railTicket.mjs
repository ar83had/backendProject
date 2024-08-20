import {database} from './database.mjs';
const signup = await database("railwayuser","signup");
const train = await database("railwaytrain","traininfo");

async function gettrainInfo(id){

    let re = await train.find({"trainId":id},{_id:0});
    return re[0];
}
async function storeUser(phoneNumber,password){
    try{
        const data = {
            "phoneNumber":phoneNumber,
            "password":password
        }
    
        let re = await signup.insertMany(data);
        return false;
    }
    catch(err){
        if(err.code == 11000)
            return err.code;
        else
        {
            return 1;
        }

    }
}

async function findUser(phoneNumber,password){
    const data = {"phoneNumber":phoneNumber,"password":password}
    const re =  await signup.find(data);
    return re[0];
}

export {gettrainInfo,storeUser,findUser};