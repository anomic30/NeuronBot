const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows Neuron's latency"),
    
    async execute(interaction, client) {
        console.log(client);
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}