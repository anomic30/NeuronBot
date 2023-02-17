const { SlashCommandBuilder } = require("discord.js");
const client = require("../index");
const { serverGpt } = require("../functions/gpt");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask me anything that comes to your mind.")
        .addStringOption(option => option.setName("prompt").setDescription("What do you want to ask me?").setRequired(true)),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            const prompt = interaction.options.get("prompt");
            if (prompt.length > 150) {
                interaction.reply("Thats too long! Can you please summarize it?");
                return;
            }
            const response = await serverGpt(prompt.value);
            await interaction.followUp(response);
        } catch (error) {
            console.log(error);
            await interaction.followUp("Something went wrong! Please try again later.");
        }
    }
}