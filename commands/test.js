const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command"),
    
    async execute(interaction) {
        await interaction.reply("Test command executed!");
    }
}