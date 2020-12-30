const jsonfile = require('jsonfile');
const fs = require('fs');
const { setMaxListeners, send } = require('process');

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
            {name: "$500     mute", value: "geass user will be able to silence anyone"},
            {name: "$500     clear", value: "geass user will be able to clear messages"},
            {name: "$500     disconnect", value: "geass user will be able to disconnect people from vc"},
            {name: "$75      fortune", value: "geass user will gain more 30% more money from finding gems and dollars" },
            {name: "$300+    steal", value: "geass user will be able to steal from those without adequate protection. comes in three forms: steal1 - $300, steal2 - $500, steal3 - $750. higher numbers indicate ability to bypass protection"},
            {name: "$300+    protection", value: "geass user will be protected from thieves. comes in three forms: protection1 - $300, protection2 - $500, protection3 - $750. higher numbers indicate ability to defend ones self\n___"},
            {name: "Affiliated Services", value: "___\n "},
            {name: "Mecha-Senku", value: "Unreleased"},
        )

        var stats = {};
        if (fs.existsSync('stats.json')){
            stats = jsonfile.readFileSync('stats.json');
        }
        const guildStats = stats["738087569325293728"];
        const userStats = guildStats[message.author.id];

        if(!args[0]){
            message.channel.send(shop);
            return;
        }

        if(args[0] == "disconnect" || args[0] == "mute" || args[0] == "clear") {
            if (userStats.money >= 500){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 500;
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "fortune"){
            if (userStats.money >= 75){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 75;
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "steal1" || args[0] == "protection1"){
            if (userStats.money >= 300){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 300;
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "steal2" || args[0] == "protection2"){
            if (userStats.money >= 500){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 500;
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else if(args[0] == "steal3" || args[0] == "protection3"){
            if (userStats.money >= 750){
                let role = message.member.guild.roles.cache.find(role => role.name === args[0]);
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
                userStats.money -= 750;
            } 
            else {
                message.channel.send("You cannot afford this item.");
            }
        }
        else {
            message.channel.send("We do not have this item in the shop.");
        }
    }
}