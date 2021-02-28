import 'reflect-metadata';
import express, { response } from 'express';
import createConnection from './database';
import { router } from './routers';

createConnection();

const app = express();

app.use(express.json()); // Habilitar o formato Json para o express da aplicação
app.use(router)

export{ app };