import {allProduct,filterProduct,findItem} from '../model/user.mjs'

async function getallproduct(req,res){
    try{
        let order="";
        if(req.query.order)
            order=req.query.order;
        else
            order=undefined;
    
        const re = await allProduct(order);
        res.json(re);
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Server Error");
    }
    res.end();
}


async function getfilterProduct(req,res){
    try{
        let lower = req.query.low;
        let upper = req.query.up;
        const re = await filterProduct(lower,upper);
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Server Error");
    }
    res.end();
}


async function bookItem(req,res){
    try{
        const data = {
            "itemNo":req.body.itemNo,
            "count":req.body.count
        }
    
        const re =await findItem(data);
        console.log(re);
        const json = {
            "item no":re.id,
            "item name":re.name,
            "item price":re.price,
            "total amount":(data.count*re.price)
        }
        console.log(json);
        res.json(json);
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Server Error");
    }
    res.end();
}



export{getallproduct,getfilterProduct,bookItem}