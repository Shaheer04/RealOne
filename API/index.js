if (process.env.NODE_ENV !== "production")
    require('dotenv').config();

const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();

app.get('/', (req, res) => {
    if (req.query.url === undefined) 
        return res.send("No URL provided");

    res.send('Ok!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving to port: ${port}`);
});
