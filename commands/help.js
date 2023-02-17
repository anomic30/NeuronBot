const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("How to use Neuron?"),
    
    async execute(interaction) {
        await interaction.reply("Hey! I am Neuron, an advanced AI bot developed by <@468996591219507200>. I am still in the development stage, so please be patient with me :)\n\nList of commands available now:\n`/ask ` - Ask me anything that comes to your mind.\n`/draw` - Draw something using a description! I will try to draw it as best as I can.\n`/ping` - Shows bot's latency.");
    }
}