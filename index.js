// QAQ Reborn Date : 8/5/2022

const { fs } = require('node:fs');
const { path } = require('node:path');
const { Client , Collection   } = require('discord.js');
const { PREFIX } = require('./config.json')
// TOKEN PLACEMENT
require("dotenv").config();

const client = new Client({ intents: 3276799 });
const LaunchTimeStamp = Date.now();
client.commands = new Collection();
const commandsPath = path.join(_dirname, 'X-Commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const commandFile of commandsFiles ) {
    const
}

client.once('ready', () => {
    console.log('Ready Mother Fucker');
    console.log(LaunchTimeStamp);
});

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
   const { commandName } = interaction;
   if (commandName === 'ping') {
       await interaction.reply('FUCK YOU');
   } else if ( commandName === 'server') {
       await interaction.reply(`Server Name: ${interaction.guild.name}\n
       Total members: ${interaction.guild.memberCount}\n
       Guild icon : ${interaction.guild.icon}\n
       Guild ??? : ${interaction.guild.voiceStates}`)
   } else if (commandName === 'user') {
       await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
   }
});