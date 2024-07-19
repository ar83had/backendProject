import express from 'express'
import path from 'path'
import ejs from 'ejs'

const app = express();

app.set("view engin","ejs");
app.set("engine",path.resolve("../views"));


export function main(req,res){
    res.render("index.ejs");
};