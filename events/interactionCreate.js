const { Events } = require("discord.js");
 
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.channelId !== "894190158381985814" && interaction.channelId !== "755026338016002103") {
            interaction.reply("Sorry you are now allowed to use me in this channel now :)\nI'm still in the development stage!\n\n If you still want to use me, please contact my creator, Anom");
            return;
        };
 
        const command = interaction.client.commands.get(interaction.commandName);
 
        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }
 
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};