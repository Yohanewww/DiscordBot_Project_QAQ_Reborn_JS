// QAQ Reborn Date : 8/5/2022
const { InteractionType } = require('discord.js');
const { Client , Collection   } = require('discord.js');
const { PREFIX } = require('./config.json')
// TOKEN PLACEMENT
require("dotenv").config();
const sqlite3 = require('sqlite3')
const client = new Client({ intents: 3276799 });

var pathToFfmpeg = require('ffmpeg-static');
const { createAudioPlayer } = require('@discordjs/voice');
const player = createAudioPlayer();



client.login(process.env.DISCORD_TOKEN)
    .catch((err) => console.log(err))
    console.log("bello")
;

['eventsHandler', 'commandsHandler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Client);
});


client.on("messageCreate", async (message) => {
    if(message.content.startsWith(PREFIX) && !message.author.bot) {
        console.log(message.content)
        if(message.content.slice(PREFIX.length) === "ae") {
            client.commands.get("ae").execute(message, message.content);
        }

    }

})

client.on('interactionCreate', async interaction => {
   if (interaction.isChatInputCommand()) {
       const command = client.commands.get(interaction.commandName);
       const message = client.message
       if (!command) return;
       try {
           await command.execute(client, interaction,message )
           // console.log(interaction);
       }catch (e) {
           console.error(e);
           await interaction.reply({content : e});

       }
   } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
       const command = client.commands.get(interaction.commandName);
       if (!command) return;
        try {
            await command.autocomplete(client, interaction);
        } catch (e) {
            console.error(e);
        }

   }


});