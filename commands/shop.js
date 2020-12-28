module.exports = {
    name: 'shop',
    description: "purchases item for user, displays items in shop if no args",
    execute(message, args, Discord){
        const shop = new Discord.MessageEmbed()
        .setColor("#FFFF00")
        .setTitle("ROG Marketplace")
        .setFooter("no refunds. all purchases (excluding nitro) will be repossessed every sunday.")
        .addFields(
            {name: "Geass/Abilities", value: "___\n "},
            {name: "mute", value: "geass user will be able to silence anyone"},
            {name: "clear", value: "geass user will be able to erase messages of others"},
            {name: "fortune", value: "geass user will gain more 30% more money from finding gems and dollars" },
            {name: "steal", value: "geass user will be able to steal from those without adequate protection. comes in three forms: steal1, steal2, steal3. higher numbers indicate ability to bypass protection"},
            {name: "protection", value: "geass user will be protected from thieves. comes in three forms: protection1, protection2, protection3. higher numbers indicate ability to defend ones self\n___"},
            {name: "Affiliated Services", value: "___\n "},
            {name: "senku-fy", value: "play music on the call"},
            {name: "senku-news", value: "access to science related news text channel"},
            {name: "senku-tube", value: "play youtube videos on the call"},
            {name: "senku-flix", value: "stream netflix and other streaming sites on the call"},
            {name: "senku-hub premium", value: "infer from names of aforementioned services"}
        )
        message.channel.send(shop);
    }
}