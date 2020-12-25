const Discord = require('discord.js');
const fs = require('fs');
const jsonfile = require('jsonfile');

const client = new Discord.Client();

const prefix = '!';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

let totalRP = 0;
let dayRP = 0;

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var stats = {};
if (fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');
}

client.once("ready", () => {
    console.log("C.C is at your command.");
});


client.on('message', message => {

    client.user.setActivity('Lelouch vi 33', {type: 'LISTENING'});

    if (message.author.id == client.user.id || message.author.bot){
        return;
    }
    //message mining
    
    const guildStats = stats["738087569325293728"];
    if (message.author.id in guildStats === false){
        guildStats[message.author.id] = {
            rp: 0,
            reliability: 0,
            money: 0,
            last_message: 0,
            allTimeRP: 0,
        }
    }

    const userStats = guildStats[message.author.id];
    if (Date.now() - userStats.last_message > 25000){
        userStats.last_message = Date.now();
        jsonfile.writeFileSync('stats.json', stats);
        if ((Math.floor(Math.random() * 100) + 1) <= 10){
            userStats.money += 10;
            message.react("💵");
            //message.channel.send(`<@${message.author.id}> has found 10` + " 💵.");
            jsonfile.writeFileSync('stats.json', stats);
        }
        if ((Math.floor(Math.random() * 100) + 1) == 100){
            userStats.money += 200;
            message.react("💎");
            message.channel.send(`<@${message.author.id}> has found a gem` + " 💎... " + "PS: 💎" + " = " + "200 💵");
            jsonfile.writeFileSync('stats.json', stats);
        }
    }
    //end of message mining

    if (!message.content.startsWith(prefix) || message.author.bot) { return; }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
    if (command === 'mute'){
        client.commands.get('mute').execute(message, args);
    }
    if (command === 'unmute'){
        client.commands.get('unmute').execute(message, args);
    }
    if (command === 'muteall'){
        client.commands.get('muteAll').execute(message, args);
    }
    if (command === 'unmuteall'){
        client.commands.get('unmuteAll').execute(message, args);
    }
    if (command === 'help'){
        client.commands.get('help').execute(message, args, Discord);
    }
    if (command == 'stats'){
        client.commands.get('stats').execute(message, args, Discord);
    }
    if (command == 'leaders'){
        client.commands.get('leaders').execute(message, args, Discord);
    }
    if (command == 'devmess'){
        client.commands.get('devMess').execute(message, args, Discord);
    }
});

client.on('ready', () => {
    setTimeout(function(){ // in leftToEight() milliseconds run this:
        
        let fullDate = new Date();
        if (fullDate.getDay() == 0){
            setZero();
        }
        totalRP = fullDate.getDay() * 200 + 200;
        dayRP = 0;
        client.channels.cache.get("786471369201287200").send("started");
        giveEarlyPoints();
        givePoints();

        setInterval(function(){
            dayRP = 0;
            let newFullDate = new Date();
            totalRP = newFullDate.getDay() * 200 + 200;
            giveEarlyPoints();
            client.channels.cache.get("786471369201287200").send("started again");
            client.channels.cache.get("786471369201287200").send(dayRP);
            givePoints();
        }, 24 * 60 * 60 * 1000)
        
    }, leftToEight() * 1000)
});



function leftToEight(){
    let d = new Date();
    let secs = (d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds();
    if (secs <= 75600){
        return (75600 - secs); 
    }
    return((86400 - secs) + 75600);
}

function giveEarlyPoints(){
    if ("738087569325293728" in stats === false){
        stats["738087569325293728"] = {};
    }

    const guildStats = stats["738087569325293728"];
    const channel = client.channels.cache.get("774350686997315604");
    const members = channel.members;

    members.forEach(member => {     

        try {
            const voiceChannelID = member.voice.channelID;
            if (voiceChannelID === "788115809674461234"){

                if (member.user.id in guildStats === false){
                    guildStats[member.user.id] = {
                        rp: 0,
                        reliability: 0,
                        money: 0,
                        last_message: 0,
                        allTimeRP: 0,
                        name: member.user.tag,
                    };
                }
                client.channels.cache.get("786471369201287200").send(`${member.user.tag} is on the call`);
                const userStats = guildStats[member.user.id];
                userStats.rp += 20;
                userStats.allTimeRP += 20;
                if (totalRP != 0){
                    userStats.reliability = userStats.rp / totalRP * 100;
                } else {
                    userStats.reliability = 0;
                }
            }
        }
        catch (err){
            console.log(err);
        }
    });
    client.channels.cache.get("786471369201287200").send("The 20 RP added to everyone on the call.");
    dayRP += 20;
    //totalRP += 20;

    jsonfile.writeFileSync('stats.json', stats);
}

function givePoints(){
    let dayInterval = setInterval(function(){ // repeat this every 5 minutes
        const guildStats = stats["738087569325293728"];
        const channel = client.channels.cache.get("774350686997315604");
        const members = channel.members;

        members.forEach(member => {     
            
            try {
                const voiceChannelID = member.voice.channelID;
                if (voiceChannelID === "788115809674461234"){

                    if (member.user.id in guildStats === false){
                        guildStats[member.user.id] = {
                            rp: 0,
                            reliability: 0,
                            money: 0,
                            last_message: 0,
                            allTimeRP: 0,
                            name: member.user.tag,
                        };
                    }
                
                const userStats = guildStats[member.user.id];
                userStats.rp += 5;
                userStats.allTimeRP += 5;
                userStats.reliability = userStats.rp / totalRP * 100;

                }
            }
            catch (err){
                console.log(err);
            }
        });
        //client.channels.cache.get("786471369201287200").send("5 RP added to everyone on the call.");
        dayRP += 5;
        //totalRP += 5;

        if (dayRP >= 200){
            client.channels.cache.get("786471369201287200").send("The window for RP is over.");
            clearInterval(dayInterval);
        }

        jsonfile.writeFileSync('stats.json', stats);
            
    }, 1000 * 60 * 5)
}

function setZero(){

    if ("738087569325293728" in stats === false){
        stats["738087569325293728"] = {};
    }

    const guildStats = stats["738087569325293728"];
    let i = 0;
        for (const person in guildStats){
            guildStats[Object.keys(guildStats)[i]].money += Math.floor(guildStats[Object.keys(guildStats)[i]].rp / 10);
            guildStats[Object.keys(guildStats)[i]].rp = 0;
            guildStats[Object.keys(guildStats)[i]].reliability = 0;
            i++;
        }
        //message.channel.send("all rp and reliability set to zero, money also added.");
        jsonfile.writeFileSync('stats.json', stats);
}

client.login('Nzg2NDEwMjg2Njk2NDk3MTgz.X9F_pw.5oGg5Uv0qNUasjMxNiBoJbNlrsQ');
