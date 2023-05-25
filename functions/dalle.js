const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function dalle(prompt, size, total, style) {
    if (style) {
        prompt = prompt + ` in ${style.value} style`;
    }
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: total?.value? total.value : 4,
            size: size,
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { dalle };