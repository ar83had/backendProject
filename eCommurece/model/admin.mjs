import {con} from './database.mjs';

async function storeProduct(data){
    const db=await con("ecommurece");
    const query = `insert into ecommureceproduct values (${data.id},\"${data.name}\",${data.price})`;
    const re = await db.query(query);
    console.log(re);
    return re;
}

async function removeProduct(id){
    const db = await con("ecommurece");
    const query = `delete from ecommureceproduct where id=${id}`;
    const re = await db.query(query);
    return re[0].affectedRows;
}

export {storeProduct,removeProduct};