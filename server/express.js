import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import bookRoutes from './routes/book.routes.js'
import authRoutes from './routes/auth.routes.js'
import shopRoutes from './routes/shop.routes.js'
import path from 'path'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter'
import MainRouter from './../client/MainRouter'
import userController from './controllers/user.controller.js'
import bookController from './controllers/book.controller.js'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles' 
import staticRouter from 'react'
import theme from './../client/theme'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()
 
/*app.get('/', (req, res) => {
 res.status(200).send(Template()) 
 })*/
 
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//Routes
app.use('/', userRoutes)
app.use('/', bookRoutes)
app.use('/', authRoutes)
app.use('/', shopRoutes)

app.use((err, req, res, next) => {
 if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message}) 
 }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message}) 
    console.log(err)
 } 
 });

 app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets();
    const context = {};
  
    const markup = ReactDOMServer.renderToString(
      sheets.collect(
        <StaticRouter location={req.url} context={context}>
          <ThemeProvider theme={theme}>
  <MainRouter /> 
  </ThemeProvider>
          {/* Your components here */}
        </StaticRouter>
      )
    );
  
    if (context.url) {
      return res.redirect(303, context.url);
    }
  
    const css = sheets.toString();
    res.status(200).send(
      Template({
        markup: markup,
        css: css,
      })
    );
  });
  
export default app

