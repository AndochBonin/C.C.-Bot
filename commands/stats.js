const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
    name: 'stats',
    description: "checks the stats of the first person who is tagged",
    execute(message, args, Discord){

        var stats = {};
        if (fs.existsSync('stats.json')){
            stats = jsonfile.readFileSync('stats.json');
        }

        const guildStats = stats["738087569325293728"];
        
        let target = message.mentions.users.first();
        if (!target && args[0]){
            message.channel.send("No user found.");
            return;
        }
        if (!target){
            target = message.author;
        }

        try{
            let memberTarget = message.guild.members.cache.get(target.id);

            if (target.id in guildStats){
                let geass = "none"
                if (guildStats[target.id].geass != "" && target.id != "391199878015090689" && target.id != "718369587325829160"){
                    geass = guildStats[target.id].geass;
                }
                const statsEmbed = new Discord.MessageEmbed()
                .setColor("#800080")
                .setTitle("Stats for " + memberTarget.user.tag)
                .addFields(
                    {name: "RP", value: guildStats[target.id].rp},
                    {name: "Reliability", value: guildStats[target.id].reliability + "%"},
                    {name: "All Time RP", value: guildStats[target.id].allTimeRP},
                    {name: "Account Balance", value: guildStats[target.id].money + " :dollar:"},
                )
                .setImage(target.avatarURL())

                message.channel.send(statsEmbed);

                //message.channel.send(`<@${memberTarget.user.id}>` + "'s " + "rp is " + guildStats[target.id].rp);
            } else{
                message.channel.send("This user has no records in the stats file.");
            }
        }
        catch (err){
            console.log(err);
            message.channel.send("User does not exist on this server.");
            return;
        }
        
        //message.channel.send("works");
    }
}