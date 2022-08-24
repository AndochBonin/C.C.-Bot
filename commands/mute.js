module.exports = {
    name: 'mute',
    decription: "mutes the first person who is tagged",
    execute(message, args) {
        const target = message.mentions.users.first();

        if (!message.member.hasPermission('MUTE_MEMBERS')){
            message.channel.send("You do not have the right geass for this.");
            return;
        }

        try{
            let memberTarget = message.guild.members.cache.get(target.id);

            if (target){
                const muteGif = "https://i.kym-cdn.com/photos/images/original/000/784/736/b6d.gif";
                message.channel.send(muteGif).then(msg => { msg.delete({timeout: 20000}) });
                memberTarget.voice.setMute(true);
                message.channel.send(`<@${memberTarget.user.id}> has been silenced.`);
            } else{
                message.channel.send("No user found.");
            }
        }
        catch (err){
            message.channel.send("No user found.");
            return;
        }
    }
}