const { SlashCommandBuilder } = require("discord.js");
const User = require("../models/user.model");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("refill")
        .setDescription("Allows the admin to refill the chat or image credits.")
        .addUserOption(option => option.setName("user").setDescription("The user to refill the credits for.").setRequired(true))
        .addStringOption(option => option.setName("type").setDescription("The type of credits to refill.").setRequired(true)
            .addChoices({
                name: "Chat",
                value: "chat"
            }, {
                name: "Image",
                value: "image"
            }))
        .addIntegerOption(option => option.setName("amount").setDescription("The amount of credits to refill.").setRequired(true)),
        

    async execute(interaction, client) {
        try {
            
            const discordUser = interaction.options.get("user");
            const refillType = interaction.options.get("type");
            const amount = interaction.options.get("amount");

            if (interaction.user.id !== process.env.ADMIN_ID) {
                await interaction.reply("😏 You thought you will be able to use this command, nah not today...");
                return;
            }

            //if discordUser is a bot, return
            if (discordUser.user.bot) {
                await interaction.reply({ content: "Sorry, I'm like a bottomless pit of knowledge - no need to refill me, I'll just keep spitting out information until the end of time. 🤖💬😂", ephemeral: true });
                return;
            }

            let user = await User.findOne({ userId: discordUser.user.id });
            if (!user) {
                await interaction.reply({ content: "This user is not registered in the database.", ephemeral: true});
                return;
            }

            await interaction.deferReply();

            if (refillType.value === "chat") {
                user.chatCredits = amount.value;
            } else if (refillType.value === "image") {
                user.imageCredits = amount.value;
            }

            await user.save();
            await interaction.followUp({content: `Done! Enjoy your credits <@${discordUser.user.id}>`, ephemeral: true});
        } catch (error) {
            console.log(error);
            await interaction.followUp("Something went wrong! Please try again later.");
        }
    }
}