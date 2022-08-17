const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('PING????')
        .setDescription("asdasdasda"),
    async execute(interaction) {
        await interaction.reply('PONG');
    },
};
