const {
    SlashCommandBuilder
} = require("discord.js");
const User = require("../models/user.model");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("credits")
        .setDescription("Shows how many credits you have left."),

    async execute(interaction, client) {
        try {
            // await interaction.deferReply();

            let user = await User.findOne({
                userId: interaction.user.id
            });
            if (!user) {
                await interaction.reply({
                    content: "Uh oh! It seems you haven't used any ask/draw command yet, so you're not in the database.",
                    ephemeral: true
                });
                return;
            }

            await interaction.reply({
                content: "You have `"+user.chatCredits+"` chat credits and `"+user.dalleCredits+"` image credits left.",
                ephemeral: true
            });
        } catch (error) {
            console.log(error);
            await interaction.followUp("Something went wrong! Please try again later.");
        }
    }
}