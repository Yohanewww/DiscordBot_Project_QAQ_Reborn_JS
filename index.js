// QAQ Reborn Date : 8/5/2022

const  fs = require('node:fs');
const path = require('node:path');
const { Client , Collection   } = require('discord.js');
const { PREFIX } = require('./config.json')
// TOKEN PLACEMENT
require("dotenv").config();

const client = new Client({ intents: 3276799 });

client.commands = new Collection();
const completeCommandsPath = path.join(__dirname, 'X-Commands')
const commandFiles = fs.readdirSync(completeCommandsPath).filter(file => file.endsWith('.js'));
for (const commandFile of commandFiles ) {
    const completeFilePath = path.join(completeCommandsPath, commandFile);
    const command = require(completeFilePath)

    client.commands.set(command.data.name, command);
}


client.login(process.env.DISCORD_TOKEN)
    .catch((err) => console.log(err))
    console.log("bello")
;

// ['eventHandlers', 'commandsHandlers'].forEach(handler => {
//     require('./Handlers/${handler}')(client, Client);
// });

client.on("messageCreate", async (message) => {
    if (!message.author.bot) {
        if(message.content.startsWith(PREFIX)) {
             console.log(message.content)
        }
    }

})

client.on('interactionCreate', async interaction => {
   if (!interaction.isChatInputCommand())
       return;
   const command = client.commands.get(interaction.commandName);
   if (!command) return;
   try {
       await command.execute(interaction);
   }catch (e) {
       console.error(e);
       await interaction.reply({content : e})
   }
});