const {SlashCommandBuilder} = require("discord.js");
// const sqlite3 = new sqlite3.Database()
module.exports = {
    data : new SlashCommandBuilder()
        .setName("owo")
        .setDescription("wow")
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The gif category')

                .setRequired(true)
                .addChoices(
                    { name: '<a:OwO:761726340873322546>', value: 'gif_funny' },
                    { name: 'Meme', value: 'gif_meme' },
                    { name: 'Movie', value: 'gif_movie' },
                )),

    async execute(Client, interaction){
        const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        await interaction.reply({content : `**${interationUser.user.username}**表示`})
        await interaction.channel.send("<a:642384136585347092:854955865336578068>")
        // const db = sqlite3.connect('')
    }
}