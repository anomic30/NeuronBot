const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Chat with me privately!"),
    
    async execute(interaction, client) {
        //reply an ephemeral saying the user to check his dm
        await interaction.reply({content: "Check your DM!", ephemeral: true});
        //send a message to the user's dm
        await interaction.user.send("Heya! I am Neuron, your personalized AI companion.\nYou can share anything with me and I will try to understand it.\nAll of your converations with me are privae now :)");
    }
}