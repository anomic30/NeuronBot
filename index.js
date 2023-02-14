require("dotenv").config();
const {
    Client,
    IntentsBitField,
    ActivityType
} = require("discord.js");
const {
    gpt
} = require("./functions/gpt.js");
const {
    dalle
} = require("./functions/dalle.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on("ready", () => {
    console.log("Neuron is online!");
    client.user.setActivity("/ask", {
        type: ActivityType.Listening
    });
})

// client.on("messageCreate", async (message) => {
//     if (message.author.bot) return;
//     if (message.channelId !== "894190158381985814") return;
//     if (message.content.startsWith("!")) return;

//     let previousMessage = await message.channel.messages.fetch({ limit: 25 });
//     previousMessage.sort((a, b) => a - b);

//     let conversationLog = "";
//     previousMessage.forEach((msg) => {
//         if (msg.author.bot) {
//             conversationLog += `${client.user.username}: ${msg.content}\n`;
//         } else {
//             conversationLog += `${msg.author.username}: ${msg.content}\n`;
//         }
//     });

//     console.log(conversationLog)

//     // try {
//     //     await message.channel.sendTyping();

//     //     const completion = await openai.createCompletion({
//     //         model: "text-davinci-003",
//     //         prompt: `${client.user.username} is a gpt3 bot.
//     //                  ${client.user.username}: Hello, how can I help you?
//     //                  ${conversationLog}
//     //                  ${client.user.username}:
//     //         `,
//     //         temperature: 0.5,
//     //         max_tokens: 256
//     //     });
//     //     // console.log(resp.data);
//     //     message.reply(completion.data.choices[0].text);
//     // }catch(error){
//     //     console.log(error);
//     //     return error;
//     // }
// })

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.id !== "468996591219507200") {
        interaction.reply("Sorry you are now allowed to use me now :)\nIm still in the development stage!\n\n If you still want to use me, please contact my creator, Anom");
        return;
    };

    if (interaction.commandName === "ask") {

        //fetch only the last 25 interactions where the bot has replied to the interaction user
        let messageLogs = await interaction.channel.messages.fetch({
            limit: 25
        });
        console.log(messageLogs);
        messageLogs.sort((a, b) => a - b);
        messageLogs = messageLogs.filter((message) => {
            if (message.author.id === interaction.user.id || message.author.id === client.user.id) {
                if (message.length > 200) {
                    return false;
                }
                return true;
            }
            return false;
        });

        let conversationLog = "";
        messageLogs.forEach((msg) => {
            if (msg.author.bot) {
                conversationLog += `${client.user.username}: ${msg.content}\n`;
            } else {
                conversationLog += `${interaction.user.username}: ${msg.content}\n`;
            }
        });

        try {
            interaction.deferReply();
            const prompt = interaction.options.get("prompt");
            if (prompt.length > 150) {
                interaction.reply("Thats too long! Can you please summarize it?");
                return;
            }
            const response = await gpt(prompt.value, conversationLog, client.user.username, interaction.user.username);
            console.log(conversationLog);
            interaction.followUp(response);
        } catch (error) {
            console.log(error);
            interaction.followUp("Something went wrong! Please try again later.");
        }
    } else if (interaction.commandName === "help") {
        interaction.reply("Hey! I am Neuron, an advanced AI bot created by Anom. I am still in the development stage, so please be patient with me :)\n\nList of commands available now:\n `/ask` - Ask me anything!I will try to answer your question as best as I can.\n`/draw` - Draw something using a description!I will try to draw it as best as I can.");
    } else if (interaction.commandName === "draw") {
        try {
            interaction.deferReply();
            const prompt = interaction.options.get("description");
            const size = interaction.options.get("size");
            const style = interaction.options.get("style");
            if (prompt.length < 15) {
                interaction.followUp("Thats too short! Can you explain it a bit more?");
                return;
            }
            if (prompt.length > 150) {
                interaction.followUp("Thats too long! Can you please summarize it?");
                return;
            }
            const response = await dalle(prompt.value, size.value, style);
            interaction.followUp(response);
        } catch (error) {
            console.log(error);
            interaction.followUp("Something went wrong! Please try again later.");
        }
    }
})

client.login(process.env.TOKEN);