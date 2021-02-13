const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
    name: 'shop',
    description: "purchases item for user, displays items in shop if no args",
    execute(message, args, Discord){
        const shop = new Discord.MessageEmbed()
        .setColor("#FFFF00")
        .setTitle("ROG Marketplace\n___")
        .setFooter("no refunds. all purchases (excluding nitro) will be repossessed every sunday. prices are subject to change.")
        .addFields(
            {name: "Geass/Abilities", value: "___\n "},
            {name: "mute - $500", value: "geass user will be able to silence anyone"},
            {name: "clear - $500", value: "geass user will be able to clear messages"},
            {name: "disconnect - $500", value: "geass user will be able to disconnect people from vc"},
            {name: "fortune - $50", value: "geass user will gain 30% more money from finding gems and dollars" },
            {name: "steal - $500+", value: "geass user will be able to steal from those without adequate protection. comes in three forms: steal1 - $500, steal2 - $1000, steal3 - $2500. higher numbers indicate ability to bypass protection"},
            {name: "color - $250", value: "geass user will have a unique color (blue, green, orange, purple, red, or yellow) for their display name"},
            {name: "protection - $200+", value: "geass user will be protected from thieves. comes in three forms: protection1 - $200, protection2 - $500, protection3 - $1000. higher numbers indicate ability to defend ones self\n___"},
            {name: "Affiliated Services", value: "\n___"},
            {name: "Discord Nitro - $100K", value: "user will be gifted discord nitro from C.C."},
            {name: "Mecha-Senku", value: "Unreleased"},
        )
        message.delete();
        var data = {};
        if (fs.existsSync('stats.json')){
            data = jsonfile.readFileSync('stats.json');
        }
        const guildStats = data["738087569325293728"];
        const userStats = guildStats[message.author.id];

        if(!args[0]){
            message.channel.send(shop).then(msg => { msg.delete({timeout: 60000}) });
            return;
        }

        if (message.member.roles.cache.find(r => r.name === args[0])){
            message.channel.send("You already have this geass.");
            return;
        }

        if(args[0] == "color") {
            if (userStats.money >= 250){
                if (!args[1]) {
                    message.channel.send("Choose a color to buy.");
                    return;
                }
                if (args[1] != 'red' || args[1] != 'blue' || args[1] != 'green' || args[1] != 'yellow' || args[1] != 'orange' || args[1] != 'purple'){
                    message.channel.send("This color is not available.");
                    return;
                }
                let role = message.member.guild.roles.cache.find(role => role.name === args[1]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 250;
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[1] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }

        if(args[0] == "disconnect" || args[0] == "mute" || args[0] == "clear") {
            if (userStats.money >= 500){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 500;
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[0] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "fortune"){
            if (userStats.money >= 50){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                //message.channel.send(userStats.money);
                userStats.money -= 50;
                //message.channel.send(userStats.money);
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[0] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "protection1"){
            if (userStats.money >= 200){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 200;
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[0] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "steal1" || args[0] == "protection2"){
            if (userStats.money >= 500){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 500;
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[0] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "steal2" || args[0] == "protection3"){
            if (userStats.money >= 1000){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 1000;
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[0] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "steal3"){
            if (userStats.money >= 2500){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 2500;
                jsonfile.writeFileSync('stats.json', data);
                message.channel.send("You just bought " + args[0] + "!");
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else {
            message.channel.send("We do not have this item in the shop.");
        }
        //jsonfile.writeFile('stats.json', data);
    }
}