import express from 'express';
import path from 'path';
// import session from 'express-session';
// import mongo from 'connect-mongo';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import bluebird from 'bluebird';
// import { MONGODB_URI, SESSION_SECRET } from "./utils/secrete";
// for graphQL
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

// const MongoStore = mongo(session);

// load environment variables
dotenv.config({path: '.env.example'})

// import controllers
import * as index from "./controllers/index";

// create server
const app = express();
// create graphQL server
const graphQLServer = new ApolloServer({
	schema,
	validationRules: [depthLimit(7)]
});

// connect to mongo
// const mongoUrl = MONGODB_URI;
// (<any>mongoose).Promise = bluebird;
// mongoose.connect(mongoUrl, {useMongoClient: true}).then(
// 	() => {}
// ).catch(err => {
// 	console.log('MongoDB connection error. Make sure MongoDB is runnning.' + err);
// 	// process.exit();
// });

// express configuration
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use('*', cors());
app.use(compression());
// app.use(session({
// 	resave: true,
// 	saveUninitialized: true,
// 	secret: SESSION_SECRET,
//   store: new MongoStore({
//     url: mongoUrl,
//     autoReconnect: true
//   })
// }));

// path to graphQL server
graphQLServer.applyMiddleware({app, path: '/graphql'});

// app routes
app.get('/', index.index);

export default app;
