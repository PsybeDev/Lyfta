import express from 'express';
import path from 'path';

// import controllers
import * as index from "./controllers/index";

const app = express();

// espress configuration
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


// app routes
app.get('/', index.index);

export default app;
