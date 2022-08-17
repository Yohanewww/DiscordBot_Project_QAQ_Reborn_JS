require("dotenv").config();
const { clientId , guildId } = require('./config.json')
const {DISCORD_TOKEN} = process.env

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);