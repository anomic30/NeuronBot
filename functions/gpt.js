const { Configuration, OpenAIApi } = require("openai");
const { search } = require("./web.js");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function gpt(prompt, messageLogs, clientUserName, interactionUserName) {
    try {
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

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function serverGpt(prompt) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `    Neuron is the most friendly AI Discord bot created by <@468996591219507200>.
                         ${prompt}
                   `,
            temperature: 0.8,
            max_tokens: 500
        });

        if (completion.data.choices[0].finish_reason === 'length') {
            return completion.data.choices[0].text + '...*it costs a lot for me to speak more than this.*'
        } else {
            return completion.data.choices[0].text;
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function newGpt(prompt) {
    try {
        let conversationLog = [{ role: "system", content: "You are an intelligent and a friendly Discord chat bot named Neuron. You are being developed by <@468996591219507200>" }];
        const webResult = await search(prompt);

        conversationLog.push({ role: "system", content: `Today's date and time is: ${new Date()}. I have searched the web for you so that you can use it as a reference. Elaborate as much as possible. Here it is: ` });
        conversationLog.push({ role: "system", content: JSON.stringify(webResult.knowledge_panel) + JSON.stringify(webResult.featured_snippet) + JSON.stringify(webResult.results)});
        conversationLog.push({ role: "user", content: prompt });

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: conversationLog,
            temperature: 0.8,
            max_tokens: 1000
        })

        if (completion.data.choices[0].finish_reason === 'length') {
            return completion.data.choices[0].message + '...*it costs a lot for me to speak more than this.*'
        } else {
            return completion.data.choices[0].message;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { gpt, serverGpt, newGpt };