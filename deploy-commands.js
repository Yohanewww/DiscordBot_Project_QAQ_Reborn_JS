
const {SlashCommandBuilder, Routes} = require('discord.js');
const {REST} = require ('@discordjs/rest');
require("dotenv").config();
const { clientId , guildId } = require('./config.json')
const {DISCORD_TOKEN} = process.env

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Check Latency Lah ABURAN'),
    new SlashCommandBuilder().setName('server').setDescription('check server info lah'),
    new SlashCommandBuilder().setName('user').setDescription('check USER LAH JIBAI'),
]
    .map(command => command.toJSON());

const rest = new REST ({ version: '10' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);