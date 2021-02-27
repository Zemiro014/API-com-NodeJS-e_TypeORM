import 'reflect-metadata';
import express, { response } from 'express';
import './database';
import { router } from './routers';

const app = express();

app.use(express.json()); // Habilitar o formato Json para o express da aplicação
app.use(router)

app.listen(3333, ()=>console.log("Server is running!"));