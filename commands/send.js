const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
    name: 'send',
    description: "transfers money from the user to targets bank account",
    execute(message, args){

        var stats = {};
            if (fs.existsSync('stats.json')){
                stats = jsonfile.readFileSync('stats.json');
            }
            const guildStats = stats["738087569325293728"];
            let target = message.mentions.users.first();
            let member = message.mentions.members.first();
            if (!target){
                message.channel.send("Choose someone to send to.");
                return;
            }
            if (!target.id in guildStats){
                message.channel.send("This user has no records in the stats file.");
                return;
            }

            if (!args[0] || isNaN(args[0])){
                message.channel.send("Invalid Format.");
                return;
            }
            if (target.id == message.author.id){
                message.channel.send("You cannot send to yourself.");
                return;
            }

            let amount = Math.floor(Number(args[0]));

            const senderStats = guildStats[message.author.id];

            try{
                if (target.id in guildStats){
                    const victimStats = guildStats[target.id];
                    if (senderStats.money < amount){
                        message.channel.send("You do not have sufficient funds.");
                        return;
                    }
                    victimStats.money += amount;
                    senderStats.money -= amount;
                    jsonfile.writeFileSync('stats.json', stats);
                    message.channel.send("You have sent " + amount + "!");
                } else{
                    message.channel.send("This user has no records in the stats file.");
                }
            }
            catch (err){
                console.log(err);
                message.channel.send("User does not exist on this server.");
                return;
            }
    }
}