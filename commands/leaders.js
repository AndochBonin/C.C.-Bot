const jsonfile = require('jsonfile');
const fs = require('fs');
const { DiscordAPIError } = require('discord.js');

module.exports = {
    name: 'leaders',
    description: "displays the top 5 users based on the metric provided",
    execute(message, args, Discord) {

        var stats = {};
        if (fs.existsSync('stats.json')){
            stats = jsonfile.readFileSync('stats.json');
        }
        message.delete();
        const guildStats = stats["738087569325293728"];
        let people = [];
        let size = 0;
        let stat;
        let title = "Leaderboard";
        
        //message.channel.send(args);
        //return;
        if (!args[0]){
            message.channel.send("Specify a metric. (money, rp, reliability)");
            return;
        }
        if (args[0] == "money" || args[0] == "m"){
            title = "Money Leaderboard";
            for (person in guildStats){
                let obj = {
                    name: guildStats[Object.keys(guildStats)[size]].name,
                    field: guildStats[Object.keys(guildStats)[size]].money,
                }
                people[size] = obj;
                size++;
            }
        }
        else if (args[0] == "rp"){
            title = "All Time RP Leaderboard";
            for (person in guildStats){
                let obj = {
                    name: guildStats[Object.keys(guildStats)[size]].name,
                    field: guildStats[Object.keys(guildStats)[size]].allTimeRP,
                }
                people[size] = obj;
                size++;
            }
        } 
        else if (args[0] == "reliability" || args[0] == "rb"){
            title = "Reliability Leaderboard";
            for (person in guildStats){
                let obj = {
                    name: guildStats[Object.keys(guildStats)[size]].name,
                    field: guildStats[Object.keys(guildStats)[size]].reliability,
                }
                people[size] = obj;
                size++;
            }
        } else {
            message.channel.send("Invalid metric. (money, rp, reliability).");
            return;
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
            {name: "1st - " + people[0].name, value: "**----- " + people[0].field + "**"},
            {name: "2nd - " + people[1].name, value: "**----- " + people[1].field + "**"},
            {name: "3rd - " + people[2].name, value: "**----- " + people[2].field + "**"},
            {name: "4th - " + people[3].name, value: "**----- " + people[3].field + "**"},
            {name: "5th - " + people[4].name, value: "**----- " + people[4].field + "**"},
        )
        message.channel.send(leadersEmbed).then(msg => { msg.delete({timeout: 60000}) });
    }
    //comment
}