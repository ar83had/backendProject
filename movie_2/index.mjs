import express from 'express'
import {router as main} from './routes/index.mjs';
import {router as admin} from './routes/admin.mjs';

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.static(`${import.meta.dirname}/views`));
app.use("/movie/admin",admin);
app.use("/movie",main);
app.listen(2000);