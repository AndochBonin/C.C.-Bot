module.exports = {
    name: 'help',
    description: "displays all commands C.C. can do",
    execute(message, args, Discord){

        message.delete();
        if (message.member.user.id === "391199878015090680"){
            const attachment = 'https://i.pinimg.com/originals/18/41/8d/18418da444b95b0b0e1e1ee166e915e9.gif';
            message.channel.send("You don't need any help... you are *Lelouch* remember:smiling_face_with_3_hearts:").then(msg => { msg.delete({timeout: 60000}) });
            message.channel.send(attachment).then(msg => { msg.delete({timeout: 60000}) });
            return;
        }
        const uwuEmbed = new Discord.MessageEmbed()
        .setColor('#32CD32')
        .setTitle('Commands')
        .addFields(
            {name: '!', value: 'this is the prefix before every command'},
            {name: 'clear', value: 'clears a specified number of messages'},
            {name: 'listEmojis', value: 'lists all the server emojis'},
            {name: 'mute', value: 'mutes the first person who is tagged'},
            {name: 'muteAll', value: 'mutes everyone on the voice channel'},
            {name: 'ping', value: 'sends the bots ping'},
            {name: 'sendPic (nude)', value: 'sends picture of C.C. depending on who you are'},
            {name: 'unmute', value: 'unmutes the first person tagged'},
            {name: 'unmuteAll', value: 'unmutes everyone on the voice channel'}
        )
        .setImage("https://i.gifer.com/1Fdu.gif")
        .setFooter('This bot has limited functionality on this server (the uwu lands), as some of its features clash with other bots.');

        if (message.guild.id == "763347569035313183"){
            message.channel.send(uwuEmbed);
            return;
        }
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#32CD32')
        .setTitle('Commands')
        .addFields(
            {name: '!', value: 'this is the prefix before every command'},
            {name: 'bet', value: 'over/under gambling command'},
            {name: 'clear', value: 'clears a specified number of messages'},
            {name: 'codeLeaders', value: 'displays the Codewars leaderboard'},
            {name: 'leaders (m, rp, rb)', value: "displays the top 5 users based on the metric provided"},
            {name: 'listEmojis', value: 'lists all the server emojis'},
            {name: 'mute', value: 'mutes the first person who is tagged'},
            {name: 'muteAll', value: 'mutes everyone on the voice channel'},
            {name: 'ping', value: 'sends the bots ping'},
            {name: 'send', value: 'sends the amount chosen to the first person tagged'},
            {name: 'sendPic (nude)', value: 'sends picture of C.C. depending on who you are'},
            {name: 'shop ([nameOfItem])', value: 'displays the items in the shop if no item is chosen'},
            {name: 'stats', value: 'displays the stats of the first person tagged'},
            {name: 'steal', value: 'steals the amount chosen from the first person tagged'},
            {name: 'unmute', value: 'unmutes the first person tagged'},
            {name: 'unmuteAll', value: 'unmutes everyone on the voice channel'}
        )
        .setImage("https://i.gifer.com/1Fdu.gif")
        .setFooter('*I also like pizza*');

        message.channel.send(helpEmbed).then(sentEmbed => {
            sentEmbed.react("🍕");
        } );
    }
}