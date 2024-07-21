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

const user = {display,main};
export {user};
