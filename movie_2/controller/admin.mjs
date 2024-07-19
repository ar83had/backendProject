import express from 'express'
import ejs from 'ejs'
import path from 'path'
import {fn} from '../model/admin.mjs'
import {movie} from '../views/movieData.mjs'

const app = express();

app.set("view engin","ejs");
app.set("engine",path.resolve("../views"));

const admin = 
{
    "form":function(req,res){
        res.render("adminForm.ejs");
    },
    "signup":async function(req,res){
       let flag = await fn.signup_store(req,res);
       if(flag)
            res.render("admin_main.ejs");
        else
            res.redirect("/movie/admin");
        res.end();
    },
    "login": async function(req,res){
        let valid = await fn.login_store(req,res);
        if(valid)
            res.render("admin_main.ejs",{movie})
        else
            res.write(`<h1>INVALID USER OR PASSWORD !</h1>`);
        res.end();
    },
    "displayList":async function(req,res){
        let flag =0;
        res.render("movie_list.ejs",{movie,flag});
    },
    "update":async function(req,res){
        let flag=1;
        res.render("movie_list.ejs",{movie,flag});
    },
    "insert":async function(req,res){
        let movie;
        let id = req.params.id;
        let flag;
        if(id)
        {
            flag=1;
            movie=await fn.findMovie(id)
            res.render("insertForm.ejs",{movie,flag});
        }
        else
        {
            flag=0;
            res.render("insertForm.ejs",{movie,flag})
        }
        res.end();
    },
    "store":async function(req,res){
        let data = req.body;
        data = {
            "movieId":data.id,
            "movieTittle":data.tittle,
            "ticketPrice":data.price
        }
        const id = req.body.preId;
        const movieId = movie.findIndex((ob)=>{
            return ob.movieId==id;
        })
        if(movieId!=-1)
        {
            movie.splice(movieId,1,data);
        }
        else
        {
            movie.push(data);
        }

        movie.sort((a,b)=>{return a.movieId - b.movieId})
        let flag=0;
        res.render("movie_list.ejs",{movie,flag})
        res.end();
    }
}

export {admin}