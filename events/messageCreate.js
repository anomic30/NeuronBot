const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message, client) {

    const dmChannel = await message.author.createDM();
    await dmChannel.send('Hello there!');
    console.log(dmChannel)
    // console.log(client)
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Respond to the user's message in a DM
    if (message.channel.type === 'dm') {
      message.author.send('I received your message in a DM!');
      return;
    }

    // Ignore messages that don't match any of the above conditions
    return;
  },
};



