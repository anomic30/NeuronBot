require("dotenv").config();
const {
    Client,
    IntentsBitField,
    ActivityType,
    Collection
} = require("discord.js");

const path = require("path");
const fs = require("fs");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
    ]
});

//load the events files on startup
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args)=> event.execute(...args));
    } else {
        client.on(event.name, (...args)=> event.execute(...args));
    }
}

//load the commands files on startup
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`❌ ${file} is not a valid command!`);
    }
}

client.login(process.env.TOKEN);

//Export the client
module.exports = { client };