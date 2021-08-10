import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import html from "./html-main";
import App from "../components/App";
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res) => {
    res.header('ContentType', 'text/html');
    const body: string = ReactDOMServer.renderToString(React.createElement(App, { message: 'Server'}));
    return res.send(html(body));
});

app.listen(8080, () => {
    console.log('Listening...');
});