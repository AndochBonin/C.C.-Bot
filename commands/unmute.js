module.exports = {
    name: 'unmute',
    decription: "unmutes first person who is tagged",
    execute(message, args) {
        const target = message.mentions.users.first();
        
        if (!message.member.hasPermission('MUTE_MEMBERS')){
            message.channel.send("You do not have the right geass for this.");
            return;
        }

        try{
            let memberTarget = message.guild.members.cache.get(target.id);

            if (target){
                memberTarget.voice.setMute(false);
                message.channel.send(`<@${memberTarget.user.id}> has been unsilenced.`);
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