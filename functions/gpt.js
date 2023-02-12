const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function gpt(prompt, messageLogs, clientUserName, interactionUserName){
    try{
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `    ${clientUserName} is a gpt3 AI bot created by Anom.
                         ${clientUserName}: Hello, how can I help you?
                         ${messageLogs}
                         ${interactionUserName}: ${prompt}
                   `,
            temperature: 0.5,
            max_tokens: 200
        });

        if (completion.data.choices[0].finish_reason === 'length') {
            return completion.data.choices[0].text + '...*it costs a lot for me to speak more than this.*'
          } else {
            return completion.data.choices[0].text;
        }
        
    }catch(error){
        console.log(error);
        return error;
    }
}

module.exports = {gpt};