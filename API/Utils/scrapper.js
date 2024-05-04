const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function scrap(url) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(url);

    await page.setViewport({ width: 1080, height: 1080 });

    if (page.$('.review-content') == null) {
        return [];
    }

    // if (page.$('.ant-pagination-item') != null) {
    //     await page.$$eval('.ant-pagination-item', function (items) {
    //         var pages = parseInt(items[items.length - 1].innerText);
    //         if ((pages * 3));
    //     })
    // }

    await page.waitForSelector('.item-gallery');
    const descriptionImages = await page.$$eval('.item-gallery', (content) => {
        return content.map(description => {
            const images = Array.from(description.querySelectorAll('img'))
                .map(img => img.getAttribute('src'));
            return { images };
        });
    });

    // search the top reviews
    await page.waitForSelector('.ant-select-selection-search-input');
    await page.type('#rc_select_1', '100');
    await page.keyboard.press('Enter');

    // an intentional delay to wait for the reviews to load
    await delay(2000);

    // get the reviews
    await page.waitForSelector('.review-content');

    const reviews = await page.$$eval('.review-content', (reviews) => {
        return reviews.map(review => {
            return Array.from(review.querySelectorAll('.review-content-sl'))
                .map(x => {
                    return {
                        text: x.textContent.trim().toString(),
                        stars: Array.from(x.previousElementSibling.childNodes[0].childNodes).filter(y => y.src == "https://laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png").length,
                        user: x.previousElementSibling.childNodes[1].textContent.trim().toString(),
                        postedOn: x.previousElementSibling.childNodes[2].textContent.trim().toString(),
                        images: x.nextElementSibling.className === '' ? Array.from(x.nextElementSibling.children[0].children[0].children).map(x => x.src) : []
                    };
                })
        });
    });


    await browser.close();

    return { descriptionImages, reviews };
}

module.exports = { scrap };