const {SlashCommandBuilder, Collection} = require("discord.js");
// const { InteractionType } = require('discord.js');
const sqlite3 = require('sqlite3')
var emoji_Collection = new Collection;
var emojiname = "";
var emojiidentifier = "";
var x = [];
module.exports = {

    data : new SlashCommandBuilder()
        .setName("animoji-ヽowoノ")
        .setDescription("wow")
        .addStringOption(option =>
            option.setName('meow_ヽowoノ')
            .setDescription('The gif category')
            .setAutocomplete(true)
            .setRequired(true),

        ),

    async autocomplete(client, interaction) {
        const db = new sqlite3.Database("./lib/Sqlite/X-SQLite.db")

        let emojidata = (`SELECT Emoji_Name, Emoji_Identifier FROM ANIMATEDEMOJI`)
        db.all(emojidata, [], (err, rows) => {
            if(err) {
                throw err;
            }
                rows.forEach( function fuck(row) {
                    // console.log(row.Emoji_Name)
                    emojiname = row.Emoji_Name
                    emojiidentifier = row.Emoji_Identifier
                    emoji_Collection.set(emojiname, emojiidentifier)
                    x.push(emojiname)
                    console.log(emojiname)
                    // if(emojiname.length >= 25){
                    //     console.log("fuck youbitch")
                    // } else {
                    //     console.log("fine")
                    // }
                    // console.log(emojiname)
                    // console.log(row.Emoji_Identifier)
                    }
                )
        })
        // console.log(emojiname)
        // console.log(emojiidentifier)
        // console.log(emoji_Collection)
        // console.log(x)

        if (interaction.commandName === 'animoji-ヽowoノ') {
            const focusedValue = interaction.options.getFocused();
            // const choices = ['red', 'install', 'collection', 'promise', 'debug'];
            const filtered = x.filter(x => x.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(x => ({ name: x, value: x })),
            );
        }
    },

    async execute(Client, interaction){
        const option = interaction.options.getString('meow_ヽowoノ');
        if (interaction.commandName === "animoji-ヽowoノ") {
        // const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        await interaction.reply({content : `**${option}**表示`})
        await interaction.channel.send("<a:642384136585347092:854955865336578068>")
        // const db = sqlite3.connect('')
    }}
}