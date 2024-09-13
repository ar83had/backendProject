import {allProduct,filterProduct} from '../model/user.mjs'

async function getallproduct(req,res){
    let order="";
    if(req.query.order)
        order=req.query.order;
    else
        order=undefined;

    const re = await allProduct(order);
    res.json(re);
    res.end();
}

async function getfilterProduct(req,res){
    let lower = req.query.low;
    let upper = req.query.up;
    const re = await filterProduct(lower,upper);
    res.end();
}

export{getallproduct,getfilterProduct}