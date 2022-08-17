require("dotenv").config();
const fs = require ('node:fs');
const path = require('node:path');
const { Routes} = require('discord.js');
const {REST} = require ('@discordjs/rest');

const { clientId , guildId } = require('./config.json')
const {DISCORD_TOKEN} = process.env

const commands= [];
const completeCommandsPath = path.join(__dirname, 'X-Commands')
const commandFiles = fs.readdirSync(completeCommandsPath).filter(file => file.endsWith('.js'));

for (const commandfile of commandFiles) {
    const completeFilePath = path.join(completeCommandsPath, commandfile);
    const command = require(completeFilePath);
    commands.push(command.data.toJSON());
}


const rest = new REST ({ version: '10' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);