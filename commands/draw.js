const { SlashCommandBuilder } = require("discord.js");
const { dalle } = require("../functions/dalle.js");
const { checkDalle } = require("../utils/useBot");
const { uploadArrayToIpfs } = require("../functions/ipfs.js");
const { generateImageEmbed } = require("../utils/getEmbeds.js");
const { saveImagesToDatabase } = require("../utils/saveImages.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("draw")
        .setDescription("Draw something using a description!")
        .addStringOption(option => option.setName("description").setDescription("Description of the image").setRequired(true))
        .addStringOption(option => option.setName("size").setDescription("Size of the image").setRequired(true)
            .addChoices({
                name: "256x256",
                value: "256x256"
            }, {
                name: "512x512",
                value: "512x512"
            }, {
                name: "1024x1024",
                value: "1024x1024"
            }))
        .addStringOption(option => option.setName("style").setDescription("Style of the image")
            .setChoices({
                name: "Van Gogh",
                value: "Van Gogh",
            }, {
                name: "3D 4k",
                value: "4k 3d"
            }, {
                name: "Abstract",
                value: "abstract"
            }, {
                name: "Realistic",
                value: "realistic"
            }, {
                name: "Watercolor",
                value: "watercolor"
            }, {
                name: "Comic",
                value: "comic"
            }, {
                name: "Vintage",
                value: "vintage"
            }, {
                name: "Surrealism",
                value: "surrealism"
            }, {
                name: "Cyberpunk",
                value: "cyberpunk"
            }, {
                name: "Pop Art",
                value: "pop art"
            }, {
                name: "Impressionism",
                value: "impressionism"
            })),


    async execute(interaction) {
        try {
            await interaction.deferReply();
            const prompt = interaction.options.get("description");
            const size = interaction.options.get("size");
            const style = interaction.options.get("style");

            let { dalleCredits, canUse } = await checkDalle(interaction.user.id);
            
            if (!canUse) {
                interaction.followUp({content:"You have exhausted your weekly credits. Wait for the weekly credits to be refilled!", ephemeral: true});
                return;
            }
            
            if (prompt.length < 15) {
                await interaction.followUp("Thats too short! Can you explain it a bit more?");
                return;
            }
            if (prompt.length > 150) {
                interaction.followUp("Thats too long! Can you please summarize it?");
                return;
            }
            const response = await dalle(prompt.value, size.value, style);
            console.log(response);
            const ipfsResponse = await uploadArrayToIpfs(response);
            console.log(ipfsResponse);
            const embeds = generateImageEmbed(ipfsResponse);
            await interaction.followUp({ embeds: embeds });
            await interaction.followUp({ content: "You have `" + dalleCredits + "` image credits left.", ephemeral: true });
            
            await saveImagesToDatabase(interaction.user.id, ipfsResponse);
        } catch (error) {
            console.log(error);
            interaction.followUp("Something went wrong! Please try again later.");
        }
    }
}