import express from "express";
import bodyParser from 'body-parser';
import 'dotenv/config';

import { AppDataSource } from "./src/data-source";
import { Product } from "./src/entity/Product";
import { APIRouter } from "./src/routers/api.router";

const PORT = process.env.PORT;

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
})

export const ProductRepo = AppDataSource.getRepository(Product);

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', APIRouter);

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})