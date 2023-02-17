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
            prompt: `    ${clientUserName} is a friendly Discord AI bot created by Anom.
                         ${messageLogs}
                         ${interactionUserName}: ${prompt}
                         Type your response and dont start with Neuron: 
                   `,
            temperature: 0.5,
            max_tokens: 250
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

async function serverGpt(prompt) {
    try{
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `    Neuron is the most friendly AI Discord bot created by <@468996591219507200>.
                         ${prompt}
                   `,
            temperature: 0.5,
            max_tokens: 250
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

module.exports = {gpt, serverGpt};