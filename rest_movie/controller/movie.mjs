import { json } from 'express';
import {fn as model} from '../model/movie.mjs'
import jsonXml from 'jsontoxml'

const movieList = async function(req,res){
    try
    {
        const order = req.query.sort=="desc"?-1:1;
        const href = "/movie?=sort";
        let movie = await model.get(order);
        console.log(req.auth);
        if(movie.length==0)
        {
            res.status(404);
            res.send("Not Found");
        }
        else
        {
            const data ={
                "movie":movie,
                "links":[
                    {"rel":"self","href":`${href+req.query.sort}`}
                ],
            }
            
            res.status(200);
            res.format(
                {
                    json(){
                        res.json(data);
                    },
                    xml(){
                        res.send(jsonXml(data));
                    },
                    default(){
                        res.json(data);
                    }
                }
            )
        }

        res.end();
    }
    catch(err)
    {
        res.status(500);
        console.log(err);
        res.send("Ooops! Something want wrong");
        res.end();
    }

}

const getMovie = async function(req,res){

    try
    {
        const id = req.params.id;
        const movie = await model.get(1,id);
        if(movie.length==0)
        {
            res.status(404);
            res.send("Not Found !");
        }
        else
        {
            const movieJson = {
                "movie":movie,
                "link":[
                    {"ref":"self","href":`/movie${req.url}`}
                ]
            }
        
            res.status(200);
            res.format(
                {
                    json(){
                        res.json(movieJson);
                    },
                    xml(){
                        res.send(jsonXml(movieJson));
                    },
                    default(){
                        res.json(movieJson);
                    }
                }
            )
        }
        res.end();
    }
    catch(err)
    {
        
        res.status(500);
        res.send("Ooops! Something want wrong");
        console.log(err);
        res.end();
    }
}

async function postMovie(req,res){

    try{
        const movie = {
            "movieId":req.body.movieId,
            "movieTittle":req.body.movieTittle,
            "ticketPrice":req.body.ticketPrice
        }
        let re = await model.save(movie);
        console.log(re);
        if(re.acknowledged===false)
        {
            res.status(500);
            res.send("Ooops! Something went wrong");
        }
        else
        {
            res.status(201);
            res.send(movie);
        }
        res.end();
    }
    catch(err)
    {
        console.log(err);
        res.status(500);
        res.send("Ooops! Something went wrong");
        res.end();
    }

}

async function putMovie(req,res){
    try{
        const id = req.params.id;
        const movie = {
            "movieId":req.body.movieId,
            "movieTittle":req.body.movieTittle,
            "ticketPrice":req.body.ticketPrice
        }
        
        console.log(movie);
        let re = await model.save(movie,id);
        if(re.matchedCount===0)
        {
            res.status(404);
            res.send("not Found !");
        }
        else
        {
            res.status(200);
            res.send(re);
        }

        res.end();
    }
    catch(err)
    {
        console.log(err);
        res.status(500);
        res.send("Server Error ");
        res.end();
    }

}

async function deleteMovie(req,res){
    try{
        const id  = req.params.id;
    
        let re = await model.deleteMovie(id);
        console.log(re);
        if(re.deletedCount===0)
        {
            res.status(404);
            res.send("not Found");
        }
        else
        {
            res.status(200);
            res.send(re);
        }
    
        res.end();
    }
    catch(err)
    {
        console.log(err);
        res.send(500);
        res.send("Server Error");
        res.end();
    }
}

async function booking(req,res){
    try{
        const data={
            "movieId":req.body.movieId,
        }
        let flag = await model.check(data);
        if(flag){
            const tp = parseInt(flag.ticketPrice,10)*req.body.ticketCount;
            flag.ticketCount = req.body.ticketCount;
            flag.totalAmount = tp;
            delete flag._id;
            res.json(flag);
            res.status(200);
        }
        else{
            res.status(400);
            res.send("Bad content");
        }
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Server Error");
    }
}

const fn  = {movieList,getMovie,postMovie,putMovie,deleteMovie,booking}

export{fn}