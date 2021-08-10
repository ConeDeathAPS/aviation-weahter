import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HomeComponent from "./components/Home";
const app = express();

app.get('/', (req, res) => {
    res.header('ContentType', 'text/html');
    return res.send(ReactDOMServer.renderToString(React.createElement(HomeComponent)));
});

app.listen(8080, () => {
    console.log('Listening...');
});