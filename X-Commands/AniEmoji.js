const {SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder ()
        .setName("pong")
        .setDescription("wow"),

    async execute(message, args ){

        message.channel.send(args)

    },
}