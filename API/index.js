if (process.env.NODE_ENV !== "production")
    require('dotenv').config();

const express = require('express');
const scrapper = require('./Utils/scrapper');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const genai = new GoogleGenerativeAI(process.env.API_KEY);
const client = genai.getGenerativeModel({model: "gemini-pro"})

app.get('/', async (req, res) => {
    if (req.query.url === undefined)
        res.send("No URL provided");

    await scrapper.scrap(req.query.url);

    res.send('Ok!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving to port: ${port}`);
});
