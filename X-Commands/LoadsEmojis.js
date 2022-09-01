const {SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const sqlite3 = require('sqlite3')

module.exports = {
    data : new SlashCommandBuilder()
        .setName("update-emoji")
        .setDescription("Renew & Loads all the Emoji into Database")
        .setDefaultMemberPermissions(0),
    /*
    * @param {client} client
    *  @param {interaction} interaction
    */

    async execute(client, interaction) {
        let EmojiCounter = 0
        let emojiNames = client.emojis.cache
        //Database
        const db = new sqlite3.Database("./lib/Sqlite/X-SQLite.db")
        db.run(`DELETE FROM ANIMATEDEMOJI`)
        emojiNames.forEach(function(addEmojiDatabase){
                db.run(`INSERT INTO ANIMATEDEMOJI (Emoji_Id, Emoji_Name, Emoji_Identifier, Emoji_CreatedTimeStamp, Emoji_Url, AnimatedBoolean , BelongsTo_Guild_Id, BelongsTo_Guild_Name)
                    VALUES (?,?,?,?,?,?,?,?)`,[addEmojiDatabase.id, addEmojiDatabase.name, addEmojiDatabase.identifier, addEmojiDatabase.createdTimestamp, addEmojiDatabase.url, addEmojiDatabase.animated, addEmojiDatabase.guild.id,  addEmojiDatabase.guild.name])
                EmojiCounter += 1
            }
        )
        // console.log(emojiNames)
        console.log("Animoji Database Updated")

        /* Embed Message */
        const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        const InteractionFinalReply = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('╲⎝⧹Animoji_Loader⧸⎠╱')
            .setDescription(`⠀**»**⠀ ⠀ ${EmojiCounter} Emojis Loaded <a:Parrot_PowerUp:758829390645166080>`)
            .setTimestamp()
            .setFooter({text: interationUser.user.username, iconURL:interationUser.user.avatarURL()})
       await interaction.reply({embeds: [InteractionFinalReply]})
    },
}