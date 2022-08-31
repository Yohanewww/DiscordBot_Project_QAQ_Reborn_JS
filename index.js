// QAQ Reborn Date : 8/5/2022
const { InteractionType } = require('discord.js');

const  fs = require('node:fs');
const path = require('node:path');
const { Client , Collection   } = require('discord.js');
const { PREFIX } = require('./config.json')
// TOKEN PLACEMENT
require("dotenv").config();
const sqlite3 = require('sqlite3')

const client = new Client({ intents: 3276799 });

client.commands = new Collection();
const completeCommandsPath = path.join(__dirname, 'X-Commands')
const commandFiles = fs.readdirSync(completeCommandsPath).filter(file => file.endsWith('.js'));
for (const commandFile of commandFiles ) {
    const completeFilePath = path.join(completeCommandsPath, commandFile);
    const command = require(completeFilePath)

    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "X-events");
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
for (const eventsFile of eventsFiles) {
    const eventsFilePath = path.join(eventsPath, eventsFile);
    const event = require(eventsFilePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }else {
        client.on(event.name, (...args) => event.execute(args));
    }
}

client.login(process.env.DISCORD_TOKEN)
    .catch((err) => console.log(err))
    console.log("bello")
;

// ['eventHandlers', 'commandsHandlers'].forEach(handler => {
//     require('./Handlers/${handler}')(client, Client);
// });

client.on("messageCreate", async (message) => {
    if(message.content.startsWith(PREFIX) && !message.author.bot) {
        const db = new sqlite3.Database("./lib/Sqlite/X-SQLite.db")
        let emojidata = (`SELECT Emoji_Name, Emoji_Identifier  FROM ANIMATEDEMOJI WHERE AnimatedBoolean = 1`)
        const interationUser = await message.guild.members.fetch(message.author.id);
        db.all(emojidata, [],   (err, rows) => {
            let emojisName = [];
            let emoji_Collection = new Collection;
            if (err) {
                throw err;
            }
            rows.forEach(function fuck(row) {
                    let emojiidentifier = row.Emoji_Identifier
                    let emojiname = row.Emoji_Name
                    emoji_Collection.set(emojiname, emojiidentifier)
                    emojisName.push(emojiname)
                },
            )
            let message_Content = message.content.slice(PREFIX.length)
            // var FirstContent = message_Content.shift().toLowerCase();
            if (emojisName.includes(message_Content)) {
                const channel = client.channels.cache.get(message.channelId);
                let X_emoji = emoji_Collection.get(message_Content)
                channel.send({content : `**${interationUser.displayName}**表示`})
                channel.send("<" + X_emoji + ">")
            }
        })
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