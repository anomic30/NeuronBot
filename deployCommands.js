require("dotenv").config();
const {
    REST,
    Routes
} = require("discord.js");
const {
    CLIENT_ID: clientId,
    GUILD_ID: guildId,
    TOKEN: token,
} = process.env;
const fs = require("fs");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({
    version: "10"
}).setToken(token);

// and deploy your commands!
(async () => {
    try {
        const deploymentType = process.argv[2] || '';
        if (deploymentType === '--global') {
            console.log(`Started refreshing ${commands.length} global application (/) commands.`);

            // Use the REST.put method to fully refresh all commands globally
            const data = await rest.put(
                Routes.applicationCommands(clientId), {
                    body: commands
                }
            );

            console.log(`✅ Successfully reloaded ${data.length} global application (/) commands.`);
        } else if (deploymentType === '--guild') {
            console.log(`Started refreshing ${commands.length} guild application (/) commands.`);

            // Use the REST.put method to fully refresh all commands in the guild
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId), {
                    body: commands
                }
            );

            console.log(`✅ Successfully reloaded ${data.length} guild application (/) commands.`);
        } else {
            console.log(`Invalid deployment type. Please specify either --global or --guild.`);
        }
        return;
    } catch (error) {
        console.error(error);
        return;
    }
})();