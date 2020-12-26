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
        let stat;
        let title = "Leaderboard";
        
        if (args[0] == " money" || args[0] == " m"){
            stat = guildStats[Object.keys(guildStats)[size]].money;
            title = "Money Leaderboard";
        }
        if (args[0] == "rp"){
            stat = guildStats[Object.keys(guildStats)[size]].allTimeRP;
            title = "All Time RP Leaderboard";
        }
        else{
            stat = guildStats[Object.keys(guildStats)[size]].money;
            title = "Reliability Leaderboard";
        }
        for (person in guildStats){
            let obj = {
                name: guildStats[Object.keys(guildStats)[size]].name,
                field: stat,
            }
            people[size] = obj;
            size++;
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size - 1; j++) {
                if (people[j].field < people[j + 1].field) {
                    let tmp = people[j];
                    people[j] = people[j + 1];
                    people[j + 1] = tmp;
                }
            }
        }
        const leadersEmbed = new Discord.MessageEmbed()
        .setColor("#800080")
        .setTitle(title)
        .addFields(
            {name: "1st - " + "_" + people[0].name + "_", value: "**----- " + people[0].field + "**"},
            {name: "2nd - " + "_" + people[1].name + "_", value: "**----- " + people[1].field + "**"},
            {name: "3rd - " + "_" + people[2].name + "_", value: "**----- " + people[2].field + "**"},
            {name: "4th - " + "_" + people[3].name + "_", value: "**----- " + people[3].field + "**"},
            {name: "5th - " + "_" + people[4].name + "_", value: "**----- " + people[4].field + "**"},
        )
        message.channel.send(leadersEmbed);
    }
    //comment
}