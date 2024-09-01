import {con} from './mongodb.mjs';

const get = async function(sort,id=null){
    const movie = await con("movieMovies");
    let data;
    if(!id)
        data = await movie.find().sort({"movieTittle":sort}).project({_id:0}).toArray();
    else  
        data = await movie.find({"movieId":id}).sort({"movieId":sort}).project({_id:0}).toArray();

    return data;
}

async function save(data,id){
    const movie = await con("movieMovies");
    let re;
    if(!id)
        re = await movie.insertOne(data);
    else
        re = await movie.updateMany({"movieId":id},{$set:data})
    return re;
}

async function deleteMovie(id)
{
    const movie = await con("movieMovies");
    let re = (await movie).deleteMany({"movieId":id});
    return re;
}

async function check(data){
    const db = await con("movieMovies");
    const re = await db.find(data).toArray();
    return re[0];
}

const fn = {get,save,deleteMovie,check}

export{fn}