import {findUser, gettrainInfo,find,update} from '../model/railTicket.mjs';
var ticketNumber =12345;
async function trainInfo(req,res){
    let id = req.params.id;
    let re = await gettrainInfo(id);
    res.json(re);
    res.end();
}

async function generateTicket(data,req){
    ticketNumber++;
    let phoneNumber = data.phoneNumber;
    data.ticketId=ticketNumber;
    data.phoneNumber=phoneNumber;
    return data;
}

async function booking(req,res){
    try{
        const data = {
            "trainId":req.body.trainId,
            "ticketCount":req.body.ticketCount,
            "phoneNumber":req.body.phoneNumber
        }

        const dbr = await find(data.trainId);
        if(dbr){
            if(dbr.ticketCount>=data.ticketCount)
            {
                const ticket = await generateTicket(data,req);
                const dbr = await update(data,ticket);
                res.json({"ticket":dbr[0]});
            }
            else
            {
                res.status(404);
                res.send(`Available ticket only ${dbr.ticketCount}`)
            }
        }
        else
        {
            res.status(404);
            res.end("Train not found"); 
        }
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Server Error");
    }

}
export{trainInfo,booking};