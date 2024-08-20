import {gettrainInfo} from '../model/railTicket.mjs';

async function trainInfo(req,res){
    let id = req.params.id;
    let re = await gettrainInfo(id);
    res.json(re);
    res.end();
}

export{trainInfo};