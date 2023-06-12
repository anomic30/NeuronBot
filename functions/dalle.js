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
            n: total?.value ? total.value : 1,
            size: size,
        })
        console.log(response);
        return response.data.data;
    } catch (error) {
        // console.log(error);
        // return error;
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

module.exports = { dalle };