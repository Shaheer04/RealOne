const gemini = require('./Utils/gemini');
var cors = require('cors')
const express = require('express');

const app = express();
app.use(cors({credentials: 'include', origin: '*'}));

app.get('/', async (req, res) => {
    if (req.query.url === undefined)
        res.send("No URL provided");
    
    res.send(await gemini.analyseProductReviews(req.query.url));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving to port: ${port}`);
});
