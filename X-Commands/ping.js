// const discord = require('discord.js')
// const Client = discord.Client
const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName("ping")
        .setDescription("asdasdasda"),

    async execute(Client, interaction) {
        await interaction.reply({content:`延迟... ${Client.ws.ping}ms`, ephemeral: true});
    },
};
