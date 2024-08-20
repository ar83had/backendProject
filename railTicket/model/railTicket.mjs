import {database} from './database.mjs';
const collection = await database("railwayuser","signup");

async function gettrainInfo(id){
    const collection = await database("railwaytrain","traininfo");

    let re = await collection.find({"trainId":id},{_id:0});
    return re[0];
}
async function storeUser(phoneNumber,password){
    try{
        const data = {
            "phoneNumber":phoneNumber,
            "password":password
        }
    
        let re = await collection.insertMany(data);
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

export {gettrainInfo,storeUser};