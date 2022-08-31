const  fs = require('node:fs');
const path = require("node:path");
const {Collection} = require("discord.js");

module.exports = (client) => {
    client.commands = new Collection();
    const completeCommandsPath = path.join(process.cwd(), 'X-Commands')
    const commandFiles = fs.readdirSync(completeCommandsPath).filter(file => file.endsWith('.js'));
    for (const commandFile of commandFiles ) {
        const completeFilePath = path.join(completeCommandsPath, commandFile);
        const command = require(completeFilePath)

        client.commands.set(command.data.name, command);
    }

}