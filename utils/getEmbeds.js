const {
    EmbedBuilder
} = require('discord.js');

const INFURA_PUBLIC_GATEWAY = process.env.INFURA_PUBLIC_GATEWAY;

const titles = [
    "Here's your images!",
    "Hope you like it!",
    "Here you go!",
    "Enjoy!",
]

const generateImageEmbed = (array) => {
    let embeds = [];
    for (let i = 0; i < array.length; i++) {
        if (i == 0) {
            embeds.push(new EmbedBuilder()
                .setColor(0xf745fb)
                .setTitle(titles[Math.floor(Math.random() * titles.length)])
                .setDescription("To view the images in fullscreen, simply click on them.")
                .setURL('https://neuronbot.pages.dev/')
                .setImage(INFURA_PUBLIC_GATEWAY + array[i])
            )
        } else {
            embeds.push(new EmbedBuilder()
                .setURL('https://neuronbot.pages.dev/')
                .setImage(INFURA_PUBLIC_GATEWAY + array[i]))
        }
    }
    return embeds;
}

module.exports = { generateImageEmbed };