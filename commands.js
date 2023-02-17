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
        name: "draw",
        description: "Generate images based on the description!",
        options: [
            {
                name: "description",
                description: "What do you want me to draw?",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "size",
                description: "What size do you want the image to be?",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "256x256",
                        value: "256x256"
                    },
                    {
                        name: "512x512",
                        value: "512x512"
                    },
                    {
                        name: "1024x1024",
                        value: "1024x1024"
                    },
                ],
                required: true,
            },
            {
                name: "style",
                description: "Specify a certain artistic style or color palette",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "Van Gogh",
                        value: "Van Gogh",
                    },
                    {
                        name: "Abstract",
                        value: "abstract"
                    },
                    {
                        name: "Realism",
                        value: "realism"
                    },
                    {
                        name: "Watercolor",
                        value: "watercolor"
                    },
                    {
                        name: "Comic",
                        value: "comic"
                    },
                    {
                        name: "Vintage",
                        value: "vintage"
                    },
                    {
                        name: "Surrealism",
                        value: "surrealism"
                    },
                    {
                        name: "Pop Art",
                        value: "pop art"
                    },
                    {
                        name: "Impressionism",
                        value: "impressionism"
                    },
                ]
            },
        ]
    },
    {
        name: "help",
        description: "How to use Neuron?"
    },
    {
        name: "ping",
        description: "Shows Neuron's latency"
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