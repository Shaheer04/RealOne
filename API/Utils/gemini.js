if (process.env.NODE_ENV !== "production")
    require('dotenv').config();

const scrapper = require('./scrapper');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genai = new GoogleGenerativeAI(process.env.API_KEY);
const model = genai.getGenerativeModel({ model: "gemini-pro" })

const prompt = `Given product review data including customer reviews and images, along with product images provided by the seller,
     provide a summary and insights on whether new customers should purchase the product. Additionally, score the match between the
     delivered product and the shown product, comparing description images with review images on a scale of 1 to 10. 
     Provide the response in JSON format with the following props {PositivePoints, NegativePoints, Insights, MatchScore}. 
     Keep it short and concise. No need to add any sort of comments.`;

async function analyseProductReviews(url) {
    var scrappedData = await scrapper.scrap(url);
    try {
        const result = await model.generateContent([prompt, JSON.stringify(scrappedData)]);
        return JSON.parse(result.replaceAll('```', '').replace('JSON', '').replace('json', ''))
    } catch (error) {
        return { error: error.message }
    }
    const response = await result.response;

    return JSON.parse(response.text().replaceAll('```', '').replace('JSON', '').replace('json', ''))
}

module.exports = { analyseProductReviews };