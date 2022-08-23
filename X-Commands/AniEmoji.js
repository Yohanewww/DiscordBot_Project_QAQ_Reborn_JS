const {SlashCommandBuilder} = require("discord.js");
const { InteractionType } = require('discord.js');
// const sqlite3 = require('sqlite3')
module.exports = {
    data : new SlashCommandBuilder()
        .setName("animoji-ヽowoノ")
        .setDescription("wow")
        .addStringOption(option =>
            option.setName('meow_ヽowoノ')
            .setDescription('The gif category')
            .setAutocomplete(true)
            .setRequired(true),

        ),
    async autocomplete(client, interaction) {
        if (interaction.commandName === 'animoji-ヽowoノ') {
            const focusedValue = interaction.options.getFocused();
            const choices = ['red', 'install', 'collection', 'promise', 'debug'];
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        }

    },

    async execute(Client, interaction){
        const option = interaction.options.getString('meow_ヽowoノ');
        if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;
        if (interaction.commandName === "animoji-ヽowoノ") {
        // const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        await interaction.reply({content : `**${option}**表示`})
        await interaction.channel.send("<a:642384136585347092:854955865336578068>")
        // const db = sqlite3.connect('')
    }}
}