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

    await page.waitForSelector('.item-gallery');
    const descriptionImages = await page.$$eval('.item-gallery', (content) => {
        return content.map(description => {
            const images = Array.from(description.querySelectorAll('img'))
                .map(img => img.getAttribute('src'));
            return images[0];
        });
    });

    async function getFormattedReviews() {
        return await page.$$eval('.review-content', async (reviews) => {
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
            })[0];
        });
    }

    var totalReviews = [];

    if (page.$('.ant-pagination-item') != null) {
        await page.$$eval('.ant-pagination-item', (function temp (page) {
            return async function  (items) {
            var pages = parseInt(items[items.length - 1].innerText);
            var approx = pages * 3;
            if (approx < 50) {
                while (!page.$('.ant-pagination-item-link .anticon-right').parentNode.disabled) {
                    page.$('.ant-pagination-item-link .anticon-right').parentNode.click();

                    totalReviews = totalReviews.concat(await getFormattedReviews());
                }
            } else if (approx > 50 && approx < 100) {
                await page.waitForSelector('.ant-select-selection-search-input');
                await page.type('#rc_select_1', '50');
                await page.keyboard.press('Enter');
                totalReviews = totalReviews.concat(await getFormattedReviews());
            } else if (approx > 100) {
                await page.waitForSelector('.ant-select-selection-search-input');
                await page.type('#rc_select_1', '100');
                await page.keyboard.press('Enter');
                totalReviews = totalReviews.concat(await getFormattedReviews());
                while (!page.$('.ant-pagination-item-link .anticon-right').parentNode.disabled) {
                    page.$('.ant-pagination-item-link .anticon-right').parentNode.click();
                    totalReviews = totalReviews.concat(await getFormattedReviews());
                }
            }
            }
        })(page))
    }

    await browser.close();

    return { descriptionImages, reviews };
}

module.exports = { scrap };