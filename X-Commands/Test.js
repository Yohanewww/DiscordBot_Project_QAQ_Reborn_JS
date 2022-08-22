const {SlashCommandBuilder} = require("discord.js");
// const {guildId} = require('../config.json');
const sqlite3 = require('sqlite3')

module.exports = {
    data : new SlashCommandBuilder()
        .setName("test")
        .setDescription("pk"),



    async execute(client, interaction) {

       // const EmojiMaps = client.emojis.cache
       //  console.log(EmojiMaps)
        let emojiNames = client.emojis.cache
        const db = new sqlite3.Database("./lib/Sqlite/X-SQLite.db")

        emojiNames.forEach(function(addEmojiDatabase){
                console.log(addEmojiDatabase.id)
                console.log("fuck" )
                db.run(`INSERT INTO ANIMATEDEMOJI (Emoji_Id, Emoji_Name, Emoji_Identifier, Emoji_CreatedTimeStamp, Emoji_Url, AnimatedBoolean , BelongsTo_Guild_Id, BelongsTo_Guild_Name) 
                    VALUES (?,?,?,?,?,?,?,?)`,[addEmojiDatabase.id, addEmojiDatabase.name, addEmojiDatabase.identifier, addEmojiDatabase.createdTimestamp, addEmojiDatabase.url, addEmojiDatabase.animated, addEmojiDatabase.guild.id,  addEmojiDatabase.guild.name])

            }
        )
        // console.log(emojiNames)
       await interaction.reply({content : `asdasd`})

        // const db = new emojiNames.Database("./lib/Sqlite/X-SQLite.db")
        // db.execute(`insert into Emoji_Name`)
    },
}