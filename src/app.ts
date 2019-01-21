import express from 'express';
import path from 'path';

const app = express();

// espress configuration
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

export default app;
