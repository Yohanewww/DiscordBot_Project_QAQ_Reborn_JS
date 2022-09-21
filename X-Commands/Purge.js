const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName("purge")
        .setDescription("The Purge")
        .addStringOption(option => {
            option.setName("purget")
                return option
                .setDescription("Purge Type")
                .setRequired(true)
                .addChoices(
                    {name: "Purge 5 Messages", value: "purge5"},
                    {name: "Purge 10 Messages", value: "purge10"},
                    {name: "Purge 50 Messages", value: "purge50"},
                    {name: "Purge 100 Messages", value: "purge100"},
                    {name: "Purge [?] Messages", value: "dfdf"},
                )

            },)
        .addIntegerOption(option => {
            option.setName("purgex")
                return option
                .setDescription("Purge Type")

        },)


    ,
    async execute(Client, interaction) {
        const option = interaction.options.get('purget');

        if (interaction.commandName === 'purge') {
            await interaction.reply({content : `**${option.value}**表示`})
            // const choices = interaction.command.options[0].choices
        }
    }
}