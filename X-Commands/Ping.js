// const discord = require('discord.js')
// const Client = discord.Client
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong"),

    async execute(Client, interaction) {
        const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        const InteractionFinalReply = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('╲⎝⧹Ping⧸⎠╱')
            .setDescription(`**»**⠀\`延迟...${Client.ws.ping}ms\` <a:Meow:761724979720617994>`)
            .setTimestamp()
            .setFooter({text: interationUser.user.username, iconURL:interationUser.user.avatarURL()})
        await interaction.reply({embeds: [InteractionFinalReply]})

    },
};
