import {movie} from '../views/movieData.mjs';
import express from 'express'
import path from 'path'
import ejs from 'ejs'

const app =express();

app.set("view engine","ejs");
app.set("views",path.resolve('../views'));

const display = function(req,res){
    let flag =0;
    res.render("movie_list.ejs",{movie,flag});
}
const main = function(req,res){
    res.render("userMain.ejs");
}
const ticket = function(req,res){
    let flag=2;
    res.render("movie_list.ejs",{movie,flag});
}

const booking = async function(req,res){
    const id = req.params.id;
    const movie_b = movie.find((el)=>{
        return el.movieId==id
    });
    res.render("ticketForm.ejs",{movie_b});
    res.end();
}

const store = async function(req,res){
    const data = req.body;
    res.render("ticket.ejs",{data});
    res.end();
}

const user = {display,main,ticket,booking,store};
export {user};
