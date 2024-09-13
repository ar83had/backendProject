import {allProduct,filterProduct} from '../model/user.mjs'

async function getallproduct(req,res){
    const re = await allProduct();
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