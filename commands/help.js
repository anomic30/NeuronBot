const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("How to use Neuron?"),
    
    async execute(interaction) {
        try {
            await interaction.reply("Hey! I am Neuron, an advanced AI bot being developed by <@468996591219507200>. I am still in the development stage, so please be patient with me :)\n\nList of commands available now:\n\n`/ping` - To check my latency.\n`/ask ` - To answer anything that comes to your mind.\n`/draw` - To draw a picture using your description.\n`/credits` - To show how many credits you have left.\n`/refill` - Allows the admin to refill chat/image credits.");
        } catch (error) {
            console.log(error)
        }
    }
}