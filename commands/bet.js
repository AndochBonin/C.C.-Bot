const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
    name: 'bet',
    description: "allow gambling the outcome of a random number to be over or under a user defined number",
    execute(message, args, Discord){
        //bet format = !bet [betAmount] over/under [numOfUserChoice]

        var stats = {};
        if (fs.existsSync('stats.json')){
            stats = jsonfile.readFileSync('stats.json');
        }
        const guildStats = stats["738087569325293728"];
        let target = message.author;

        if (!args[0] || isNaN(args[0])){
            message.channel.send("Invalid Format. Correct format: !bet [betAmount] over/under [numOfUserChoice]");
            return;
        }
        if (args[2] < 1 || args[2] > 100 || isNaN(args[2])){
            message.channel.send("Choose a number between 1 and 100")
            return;
        }
        let payOut;

        if  (guildStats[target.id].money < Math.floor(args[0])){
            message.channel.send("You do not have sufficient funds.");
            return;
        }

        if (args[1] == "over"){
            payOut = 100 + Number(args[2]);
            guildStats[target.id].money -= Math.floor(args[0]);
            guildStats[target.id].money = Number(guildStats[target.id].money.toFixed(2));
            jsonfile.writeFileSync('stats.json', stats);
            let randNum = Math.floor(Math.random() * 100) + 1;
            if (args[2] >= randNum){
                const lossEmbed = new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setTitle("You lose.")
                .addFields(
                {name: "Your Bet:", value: "Over " + args[2]},
                {name: "Actual Number:", value: randNum},
                {name: "Total Losses: " + args[0], value: "Better luck next time!"}
                )
                message.channel.send(lossEmbed);
                return;
            }
            const winEmbed = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTitle("You Win!")
            .addFields(
            {name: "Your Bet:", value: "Over " + args[2]},
            {name: "Actual Number:", value: randNum},
            {name: "Total Payout: " + (Math.floor(args[0]) / 100 * payOut).toFixed(2), value: "Profit: " + ((Math.floor(args[0]) / 100 * payOut).toFixed(2) - Math.floor(args[0])).toFixed(2)},
            )
            message.channel.send(winEmbed);
            guildStats[target.id].money += Math.floor(args[0]) / 100 * payOut;
            guildStats[target.id].money = Number(guildStats[target.id].money.toFixed(2));
            jsonfile.writeFileSync('stats.json', stats);
            //message.channel.send("You win! Payout: " + Math.floor(args[0]) / 100 * payOut);
        }
        else if (args[1] == "under"){
            payOut = 100 + (101 - Number(args[2]));
            guildStats[target.id].money -= Math.floor(args[0]);
            guildStats[target.id].money = Number(guildStats[target.id].money.toFixed(2));
            jsonfile.writeFileSync('stats.json', stats);
            let randNum = Math.floor(Math.random() * 100) + 1;
            //message.channel.send("The number is... " + randNum);
            if (args[2] <= randNum){
                const lossEmbed = new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setTitle("You lose.")
                .addFields(
                {name: "Your Bet:", value: "Under " + args[2]},
                {name: "Actual Number:", value: randNum},
                {name: "Total Losses: " + args[0], value: "Better luck next time!"}
                )
                message.channel.send(lossEmbed);
                return;
            }
            const winEmbed = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTitle("You Win!")
            .addFields(
            {name: "Your Bet:", value: "Under " + args[2]},
            {name: "Actual Number:", value: randNum},
            {name: "Total Payout: " + (Math.floor(args[0]) / 100 * payOut).toFixed(2), value: "Profit: " + ((Math.floor(args[0]) / 100 * payOut).toFixed(2) - Math.floor(args[0])).toFixed(2)},
            )
            message.channel.send(winEmbed);
            guildStats[target.id].money += Math.floor(args[0]) / 100 * payOut;
            guildStats[target.id].money = Number(guildStats[target.id].money.toFixed(2));
            jsonfile.writeFileSync('stats.json', stats);
        } 
        else {
            message.channel.send("Invalid Format. Correct format: !bet [betAmount] over/under [numOfUserChoice]")
            return;
        }
    }
}