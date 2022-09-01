const { Collection   } = require('discord.js');
const { PREFIX } = require('../config.json')
const sqlite3 = require("sqlite3");

module.exports = {
    name : "messageCreate",
    async execute(message, client )  {
    if(message.content.startsWith(PREFIX) && !message.author.bot) {
        const interationUser = await message.guild.members.fetch(message.author.id);
        const db = new sqlite3.Database("./lib/Sqlite/X-SQLite.db")
        let emojidata = (`SELECT Emoji_Name, Emoji_Identifier  FROM ANIMATEDEMOJI WHERE AnimatedBoolean = 1`)
        /* Database */
        db.all(emojidata, [],   (err, rows) => {
            let emojisName = [];
            let emoji_Collection = new Collection;
            if (err) {
                throw err;
            }
            rows.forEach(function (row) {
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
                let Animoji = emoji_Collection.get(message_Content)
                channel.send({content : `**${interationUser.displayName}**表示`})
                channel.send("<" + Animoji + ">")
            }
        })
    }

}
}