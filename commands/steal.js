const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
    name: 'steal',
    description: "forcibly transfers money from the target to users bank account",
    execute(message, args){

        if(message.member.roles.cache.find(r => r.name === "steal1") || 
        message.member.roles.cache.find(r => r.name === "steal2") || 
        message.member.roles.cache.find(r => r.name === "steal3")) 
        {
            let today = new Date().getDay();
            if (today == 0){
                message.channel.send("No fan fooling on Sunday.");
                return;
            }
            var stats = {};
            if (fs.existsSync('stats.json')){
                stats = jsonfile.readFileSync('stats.json');
            }
            const guildStats = stats["738087569325293728"];
            let target = message.mentions.users.first();
            let member = message.mentions.members.first();
            if (!target){
                message.channel.send("Choose someone to steal from.");
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
                message.channel.send("You cannot steal from yourself.");
                return;
            }
            if (member.roles.cache.find(r => r.name === "protection1")){
                if (!message.member.roles.cache.find(r => r.name === "steal2") && 
                !message.member.roles.cache.find(r => r.name === "steal3")){
                    message.channel.send("This user is protected from your geass.")
                    return;
                }
            }
            if (member.roles.cache.find(r => r.name === "protection2")){
                if (!message.member.roles.cache.find(r => r.name === "steal3")){
                    message.channel.send("This user is protected from your geass.")
                    return;
                }
            }
            if (member.roles.cache.find(r => r.name === "protection3")){
                message.channel.send("This user is protected from your geass.")
                return;
            }
            let amount = Math.floor(Number(args[0]));

            const thiefStats = guildStats[message.author.id];
            let stealChance = Math.floor(Math.random() * 100) + 1;
            if (stealChance > 80 - thiefStats.steals){
                message.channel.send("Heist unsuccessful.");
                thiefStats.steals += 20;
                jsonfile.writeFileSync('stats.json', stats);
                return;
            }

            try{
                if (target.id in guildStats){
                    const victimStats = guildStats[target.id];
                    if (victimStats.money < amount){
                        message.channel.send("Target does not have that much money. Please spare them.");
                        return;
                    }
                    victimStats.money -= amount;
                    thiefStats.money += amount;
                    thiefStats.steals += 20;
                    jsonfile.writeFileSync('stats.json', stats);
                    message.channel.send("You have stolen " + amount + "!");
                } else{
                    message.channel.send("This user has no records in the stats file.");
                }
            }
            catch (err){
                console.log(err);
                message.channel.send("User does not exist on this server.");
                return;
            }

        } else {
            message.channel.send("You do not have the right geass for this.");
            return;
        }
    }
}