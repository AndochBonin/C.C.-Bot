module.exports = {
    name: 'help',
    description: "displays all commands C.C. can do",
    execute(message, args, Discord){

        if (message.member.user.id === "391199878015090689"){
            const attachment = 'https://i.pinimg.com/originals/18/41/8d/18418da444b95b0b0e1e1ee166e915e9.gif';
            message.channel.send("You don't need any help... you are *Lelouch* remember:smiling_face_with_3_hearts:");
            message.channel.send(attachment);
            return;
        }

        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#32CD32')
        .setTitle('Commands')
        .addFields(
            {name: '!', value: 'this is the prefix before every command'},
            {name: 'clear', value: 'clears a specified number of messages'},
            {name: 'leaders (m, rp, rb)', value: "displays the top 5 users based on the metric provided"},
            {name: 'mute', value: 'mutes the first person who is tagged'},
            {name: 'muteAll', value: 'mutes everyone on the voice channel'},
            {name: 'ping', value: 'sends the bots ping'},
            {name: 'stats', value: 'displays the stats of the first person who is tagged'},
            {name: 'unmute', value: 'unmutes the first person who is tagged'},
            {name: 'unmuteAll', value: 'unmutes everyone on the voice channel'}
        )
        .setImage("https://i.gifer.com/1Fdu.gif")
        .setFooter('*I also like pizza*');

        message.channel.send(helpEmbed).then(sentEmbed => {sentEmbed.react("🍕")} );
    }
}