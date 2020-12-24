const jsonfile = require('jsonfile');
const fs = require('fs');
const { DiscordAPIError } = require('discord.js');

module.exports = {
    name: 'leaders',
    description: "displays the leaderboard sorted by the argument provided",
    execute(message, args, Discord) {

        var stats = {};
        if (fs.existsSync('stats.json')){
            stats = jsonfile.readFileSync('stats.json');
        }

        const guildStats = stats["738087569325293728"];
        let people = [];
        let size = 0;
        for (person in guildStats){
            let obj = {
                name: guildStats[Object.keys(guildStats)[size]].name,
                rp: guildStats[Object.keys(guildStats)[size]].allTimeRP,
            }
            people[size] = obj;
            size++;
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size - 1; j++) {
                if (people[j].rp < people[j + 1].rp) {
                    let tmp = people[j];
                    people[j] = people[j + 1];
                    people[j + 1] = tmp;
                }
            }
        }
        const leadersEmbed = new Discord.MessageEmbed()
        .setColor("#800080")
        .setTitle("All Time RP Leaderboard")
        .addFields(
            {name: "1st - " + "_" + people[0].name + "_", value: "**----- " + people[0].rp + "**"},
            {name: "2nd - " + "_" + people[1].name + "_", value: "**----- " + people[1].rp + "**"},
            {name: "3rd - " + "_" + people[2].name + "_", value: "**----- " + people[2].rp + "**"},
            {name: "4th - " + "_" + people[3].name + "_", value: "**----- " + people[3].rp + "**"},
            {name: "5th - " + "_" + people[4].name + "_", value: "**----- " + people[4].rp + "**"},
        )
        message.channel.send(leadersEmbed);
    }
    //comment
}