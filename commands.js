const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
require("dotenv").config();

const commands = [
    {
        name: "ask",
        description: "Ask me anything!",
        options: [
            {
                name: "prompt",
                description: "What do you want to ask me?",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: "help",
        description: "How to use Neuron?"
    }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    console.log("Registering slash commands...")

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log("Slash commands were registered successfully!")
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})()