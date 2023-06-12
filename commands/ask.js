const { SlashCommandBuilder } = require("discord.js");
const client = require("../index");
const { serverGpt, newGpt } = require("../functions/gpt");
const { chatBard, textBard} = require("../functions/bard");
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
            // console.log(prompt.value)

            if (prompt.value.length > 200) {
                await interaction.followUp("Thats too long! Can you please summarize it?");
                return;
            }

            let {chatCredits, canUse} = await checkChat(interaction.user.id);

            if (!canUse) {
                interaction.followUp({content:"You have exhausted your weekly credits. Wait for the weekly credits to be refilled!", ephemeral: true});
                return;
            }
            
            const response = await textBard(prompt.value);
            if(!response) {
                await interaction.followUp("Something went wrong! Please try again later.");
                return;
            }
            // console.log(response);
            await interaction.followUp(response);
            await interaction.followUp({content: "You have `" + chatCredits + "` chat credits left.", ephemeral: true});
        } catch (error) {
            console.log(error);
            await interaction.followUp("Something went wrong! Please try again later.");
        }
    }
}