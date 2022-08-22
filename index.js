// QAQ Reborn Date : 8/5/2022

const  fs = require('node:fs');
const path = require('node:path');
const { Client , Collection   } = require('discord.js');
// const { PREFIX } = require('./config.json')
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
    if (message.content === "listemojis") {
        const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
        console.log(emojiList)
    }
    // if (!message.author.bot) {
    //     if(message.content.startsWith(PREFIX)) {
    //          console.log(message.content)
    //     }
    // }

})

client.on('interactionCreate', async interaction => {
    const message = client.message
   if (!interaction.isChatInputCommand())
       return;
   const command = client.commands.get(interaction.commandName);

   if (!command) return;
   try {
       await command.execute(client, interaction,message )
       // console.log(interaction);
   }catch (e) {
       console.error(e);
       await interaction.reply({content : e})
   }
});