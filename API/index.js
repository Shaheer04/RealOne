if (process.env.NODE_ENV !== "production")
    require('dotenv').config();

const express = require('express');
const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();

app.get('/', (req, res) => {
    if (req.query.url === undefined)
        return res.send("No URL provided");

    res.send('Ok!');
});

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Replace 'https://example.com' with the actual URL of the webpage
    await page.goto('https://www.daraz.pk/products/m10-m90-i12-black-double-wireless-2-airpods-bluetooth-hand-free-with-power-bank-earphones-white-bluetooth-ear-phone-for-all-cell-phones-i238468195-s1944406027.html?&search=0?spm=a2a0e.pdp.recommend_2.1.2fc0564ftbWunI&mp=1&scm=1007.38553.252219.0&clickTrackInfo=46b997cc-daca-4f14-85fc-3a5ba5e36d58__238468195__9708__i2i__372903__0.016310517__0.016310517__0.0__0.0__0.0__0.0457985__0__null__null__null__null__null__null____3000.0__0.7433333333333334__4.01282__3433__770.0__12005,175126,176295,176447,307145,328033,338849,338890,340981,350708,394659,449869,487837,527494,537710,539689,679071,679970,719985,757802,775095,1174828__null__null__null__3650.16544_955.3632_4559.21183__null__28556__null__0.0__0.0________null__null');

    await page.setViewport({ width: 1080, height: 1080 });


    await page.waitForSelector('.ant-select-selection-search-input');
    await page.type('#rc_select_1', '100');
    await page.keyboard.press('Enter');

    await delay(2000);

    // Wait for the element with class "review-content" to be loaded
    //await page.waitForSelector('.review-content');

    // Extract the reviews from the page
    await page.waitForSelector('.review-content');
    const reviews = await page.$$eval('.review-content', (reviews) => {
        return reviews.map(review => {
            const textContent = review.textContent.trim();
            const images = Array.from(review.querySelectorAll('img'))
                .map(img => img.getAttribute('src'));
            return { textContent, images };
        });
    });

    console.log(reviews);

    imgs = reviews[0].images;
    imgfilter = imgs.filter((img) => img.startsWith('https://'));

    text = reviews[0].textContent.split('ago...');


    console.log(text);
    console.log(imgfilter);

    await browser.close();


}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving to port: ${port}`);
});
