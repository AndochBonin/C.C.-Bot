require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const jsonfile = require('jsonfile');
const debug = require('debug')('c.c-bot:');

const client = new Discord.Client();

const prefix = '!';

client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync('./commands/')
    .filter((file) => file.endsWith('.js'));

let totalRP = 0;
let dayRP = 0;
let today = new Date().getDay();
totalRP = 200 * today + 200;

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var stats = {};
if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}

client.once('ready', () => {
    console.log('C.C is at your command.');
});

client.on('message', (message) => {
    client.user.setActivity('Lelouch vi 33', { type: 'LISTENING' });

    if (message.author.id == client.user.id || message.author.bot) {
        return;
    }

    stats = {};
    if (fs.existsSync('stats.json')) {
        stats = jsonfile.readFileSync('stats.json');
    }

    const guildStats = stats['738087569325293728'];
    if (
        message.author.id in guildStats === false &&
        message.guild.id === '738087569325293728'
    ) {
        guildStats[message.author.id] = {
            rp: 0,
            reliability: 0,
            money: 0,
            last_message: 0,
            allTimeRP: 0,
            name: message.author.tag,
            daily: 0,
            geass: '',
            steals: 0,
        };
    }
    const userStats = guildStats[message.author.id];
    //message mining
    const acceptedChannels = [
        '738087786342776882',
        '774350686997315604',
        '738088061874995210',
        '772063969556299806',
    ];

    if (
        acceptedChannels.includes(message.channel.id) &&
        Date.now() - userStats.last_message >= 25000 &&
        userStats.daily < 100
    ) {
        userStats.last_message = Date.now();
        jsonfile.writeFileSync('stats.json', stats);
        let moneyChance = Math.floor(Math.random() * 100) + 1;
        //client.channels.cache.get("786471369201287200").send(moneyChance);
        if (moneyChance <= 10) {
            if (message.member.roles.cache.find((r) => r.name === 'fortune')) {
                userStats.money += 5;
            }
            userStats.money += 10;
            userStats.daily += 10;
            message.react('💵');
            //message.channel.send(`<@${message.author.id}> has found 10` + " 💵.");
            jsonfile.writeFileSync('stats.json', stats);
        }
        if (moneyChance == 100) {
            if (message.member.roles.cache.find((r) => r.name === 'fortune')) {
                userStats.money += 50;
            }
            userStats.money += 100;
            userStats.daily += 100;
            message.react('💎');
            message.channel.send(
                `<@${message.author.id}> has found a gem` +
                    ' 💎... ' +
                    'PS: 💎' +
                    ' = ' +
                    '100 💵'
            );
            jsonfile.writeFileSync('stats.json', stats);
        }
    }
    //end of message mining

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const par = message.content.slice(prefix.length);

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    if (command === 'clear') {
        client.commands.get('clear').execute(message, args);
    }
    if (command === 'mute') {
        client.commands.get('mute').execute(message, args);
    }
    if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args);
    }
    if (command === 'muteall') {
        client.commands.get('muteAll').execute(message, args);
    }
    if (command === 'unmuteall') {
        client.commands.get('unmuteAll').execute(message, args);
    }
    if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord);
    }
    if (command == 'stats') {
        client.commands.get('stats').execute(message, args, Discord);
    }
    if (command == 'leaders') {
        client.commands.get('leaders').execute(message, args, Discord);
        //message.channel.send("https://i.gifer.com/IlDK.gif");
    }
    if (command == 'devmess') {
        client.commands.get('devMess').execute(message, par, Discord);
    }
    if (command == 'shop') {
        client.commands.get('shop').execute(message, args, Discord);
    }
    if (command == 'steal') {
        //message.channel.send("https://i.gifer.com/IlDK.gif");
        client.commands.get('steal').execute(message, args);
    }
    if (command == 'send') {
        //message.channel.send("https://i.gifer.com/IlDK.gif");
        client.commands.get('send').execute(message, args);
    }
    if (command == 'sendpic') {
        client.commands.get('sendPic').execute(message, args);
    }
    if (command == 'listemojis') {
        const emojiList = message.guild.emojis.cache
            .map((emoji) => emoji.toString())
            .join(' ');
        message.channel.send(emojiList);
    }
    if (command == 'bet') {
        client.commands.get('bet').execute(message, args, Discord);
    }
    if (command == 'codeleaders') {
        client.commands.get('codeLeaders').execute(message, args, Discord);
    }
    if (command == 'hackleaders') {
        //client.commands.get('hackLeaders').execute(message, args, Discord);
        message.channel.send('https://i.gifer.com/IlDK.gif');
    }
    if (command == 'stocks') {
        client.commands.get('stocks').execute(message, args, Discord);
    }

    stats = jsonfile.readFileSync('stats.json');
    //const userStats = guildStats[message.author.id];
    if (totalRP != 0) {
        userStats.reliability = Math.round((userStats.rp / totalRP) * 100);
        jsonfile.writeFileSync('stats.json', stats);
    } else {
        userStats.reliability = 0;
        jsonfile.writeFileSync('stats.json', stats);
    }
    //stats = jsonfile.readFileSync('stats.json');
});

client.on('ready', () => {
    setTimeout(function () {
        // in leftToEight() milliseconds run this:

        let fullDate = new Date();
        if (fullDate.getDay() == 0) {
            setZero();
            resetGeass();
        }
        totalRP = fullDate.getDay() * 200 + 200;
        dayRP = 0;
        client.channels.cache.get('786471369201287200').send('started');
        resetLimit();
        giveEarlyPoints();
        givePoints();

        setInterval(function () {
            dayRP = 0;
            let newFullDate = new Date();
            if (newFullDate.getDay() == 0) {
                setZero();
                resetGeass();
            }
            totalRP = newFullDate.getDay() * 200 + 200;
            resetLimit();
            giveEarlyPoints();
            client.channels.cache
                .get('786471369201287200')
                .send('started again');
            //client.channels.cache.get("786471369201287200").send(dayRP);
            givePoints();
        }, 24 * 60 * 60 * 1000);
    }, leftToEight() * 1000);
});

function leftToEight() {
    let d = new Date();
    let secs = (d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds();
    if (secs <= 76200) {
        return 76200 - secs;
    }
    return 86400 - secs + 76200;
}

function giveEarlyPoints() {
    if ('738087569325293728' in stats === false) {
        stats['738087569325293728'] = {};
    }

    const guildStats = stats['738087569325293728'];
    const channel = client.channels.cache.get('774350686997315604');
    const members = channel.members;

    members.forEach((member) => {
        try {
            const voiceChannelID = member.voice.channelID;
            if (voiceChannelID === '788115809674461234') {
                if (member.user.id in guildStats === false) {
                    guildStats[member.user.id] = {
                        rp: 0,
                        reliability: 0,
                        money: 0,
                        last_message: 0,
                        allTimeRP: 0,
                        name: member.user.tag,
                        daily: 0,
                        geass: '',
                        steals: 0,
                    };
                }
                client.channels.cache
                    .get('786471369201287200')
                    .send(`${member.user.tag} is on the call`);
                const userStats = guildStats[member.user.id];
                userStats.rp += 20;
                userStats.allTimeRP += 20;
                if (totalRP != 0) {
                    userStats.reliability = Math.round(
                        (userStats.rp / totalRP) * 100
                    );
                } else {
                    userStats.reliability = 0;
                }
            }
        } catch (err) {
            debug(err);
        }
    });
    client.channels.cache
        .get('786471369201287200')
        .send('The 20 RP added to everyone on the call.');
    dayRP += 20;
    //totalRP += 20;

    jsonfile.writeFileSync('stats.json', stats);
}

function givePoints() {
    let dayInterval = setInterval(function () {
        // repeat this every 5 minutes
        const guildStats = stats['738087569325293728'];
        const channel = client.channels.cache.get('774350686997315604');
        const members = channel.members;

        members.forEach((member) => {
            try {
                const voiceChannelID = member.voice.channelID;
                if (voiceChannelID === '788115809674461234') {
                    if (member.user.id in guildStats === false) {
                        guildStats[member.user.id] = {
                            rp: 0,
                            reliability: 0,
                            money: 0,
                            last_message: 0,
                            allTimeRP: 0,
                            name: member.user.tag,
                            daily: 0,
                            geass: '',
                            steals: 0,
                        };
                    }

                    const userStats = guildStats[member.user.id];
                    userStats.rp += 5;
                    userStats.allTimeRP += 5;
                    userStats.reliability = Math.round(
                        (userStats.rp / totalRP) * 100
                    );
                }
            } catch (err) {
                debug(err);
            }
        });
        //client.channels.cache.get("786471369201287200").send("5 RP added to everyone on the call.");
        dayRP += 5;
        //totalRP += 5;

        if (dayRP >= 200) {
            client.channels.cache
                .get('786471369201287200')
                .send('The window for RP is over.');
            clearInterval(dayInterval);
        }

        jsonfile.writeFileSync('stats.json', stats);
    }, 1000 * 60 * 5);
}

function setZero() {
    if ('738087569325293728' in stats === false) {
        stats['738087569325293728'] = {};
    }

    const guildStats = stats['738087569325293728'];
    let i = 0;
    for (const person in guildStats) {
        guildStats[Object.keys(guildStats)[i]].money += Math.floor(
            guildStats[Object.keys(guildStats)[i]].rp / 2
        );
        guildStats[Object.keys(guildStats)[i]].rp = 0;
        guildStats[Object.keys(guildStats)[i]].reliability = 0;
        guildStats[Object.keys(guildStats)[i]].steals = 0;
        i++;
    }
    //message.channel.send("all rp and reliability set to zero, money also added.");
    jsonfile.writeFileSync('stats.json', stats);
}

function resetLimit() {
    if ('738087569325293728' in stats === false) {
        stats['738087569325293728'] = {};
    }

    const guildStats = stats['738087569325293728'];
    let i = 0;
    for (const person in guildStats) {
        guildStats[Object.keys(guildStats)[i]].daily = 0;
        i++;
    }
    //message.channel.send("set daily limit to zero.");
    jsonfile.writeFileSync('stats.json', stats);
}

function resetGeass() {
    let roleIDs = [
        'steal1',
        'steal2',
        'steal3',
        'protection1',
        'protection2',
        'protection3',
        'fortune',
    ];

    let colourRoles = [
        'blue',
        'green',
        'orange',
        'purple',
        'red',
        'yellow',
    ];

    let defRoleIDs = ['mute', 'disconnect', 'clear'];
    let i = 0;
    let j = 0;
    let k = 0;
    let guild = client.guilds.cache.get('738087569325293728');
    //delete roles

    for (person in roleIDs) {
        guild.roles.cache.find((role) => role.name === roleIDs[i]).delete();
        i++;
    }
    for (person in defRoleIDs) {
        guild.roles.cache.find((role) => role.name === defRoleIDs[j]).delete();
        j++;
    }
    for (person in colourRoles) {
        guild.roles.cache.find((role) => role.name === colourRoles[k]).delete();
        k++;
    }

    //create roles
    
    guild.roles.create({
        data: {
            name: 'blue',
            color: 'BLUE',
        },
    });
    guild.roles.create({
        data: {
            name: 'green',
            color: 'GREEN',
        },
    });
    guild.roles.create({
        data: {
            name: 'orange',
            color: 'ORANGE',
        },
    });
    guild.roles.create({
        data: {
            name: 'blue',
            color: 'PURPLE',
        },
    });
    guild.roles.create({
        data: {
            name: 'red',
            color: 'RED',
        },
    });
    guild.roles.create({
        data: {
            name: 'yellow',
            color: 'YELLOW',
        },
    });

    i = 0;
    for (person in roleIDs) {
        guild.roles.create({
            data: {
                name: roleIDs[i],
                color: 'GREY',
                permissions: [],
            },
        });
        i++;
    }
    guild.roles.create({
        data: {
            name: 'mute',
            color: 'GREY',
            permissions: ['MUTE_MEMBERS'],
        },
    });
    guild.roles.create({
        data: {
            name: 'clear',
            color: 'GREY',
            permissions: ['MANAGE_MESSAGES'],
        },
    });
    guild.roles.create({
        data: {
            name: 'disconnect',
            color: 'GREY',
            permissions: ['MOVE_MEMBERS'],
        },
    });
    
}

client.login('Nzg2NDEwMjg2Njk2NDk3MTgz.X9F_pw.ITCj5sYHLIOYomB4NO7nrlEBpjY');
