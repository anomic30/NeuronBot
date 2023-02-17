const { SlashCommandBuilder } = require("discord.js");
const { client } = require("../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows Neuron's latency"),
    
    async execute(interaction) {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}