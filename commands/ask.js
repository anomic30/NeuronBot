const { SlashCommandBuilder } = require("discord.js");
const client = require("../index");
const { serverGpt, newGpt } = require("../functions/gpt");
const { checkChat } = require("../utils/useBot");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask me anything that comes to your mind.")
        .addStringOption(option => option.setName("prompt").setDescription("What do you want to ask me?").setRequired(true)),

    async execute(interaction, client) {
        try {
            await interaction.deferReply();
            const prompt = await interaction.options.get("prompt");

            if (prompt.value.length > 150) {
                await interaction.followUp("Thats too long! Can you please summarize it?");
                return;
            }

            let {chatCredits, canUse} = await checkChat(interaction.user.id);

            if (!canUse) {
                interaction.followUp({content:"You have exhausted your weekly credits. Wait for the weekly credits to be refilled!", ephemeral: true});
                return;
            }

            const response = await newGpt(prompt.value);
            await interaction.followUp(response);
            await interaction.followUp({content: `You have ${chatCredits} chat credits left.`, ephemeral: true});
        } catch (error) {
            console.log(error);
            await interaction.followUp("Something went wrong! Please try again later.");
        }
    }
}