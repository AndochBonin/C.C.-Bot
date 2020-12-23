module.exports = {
    name: 'muteAll',
    description: "mutes everyone on the voice channel",
    execute(message, args) {

        const channel = message.channel;
        const members = channel.members;
        
        if (!message.member.hasPermission('MUTE_MEMBERS')){
            message.channel.send("You do not have the right geass for this.");
            return;
        }

        const muteGif = "https://i.kym-cdn.com/photos/images/original/000/784/736/b6d.gif";
        message.channel.send(muteGif).then(msg => { msg.delete({timeout: 15000}) });
        
            members.forEach(member => {
                member.voice.setMute(true).catch();
                //member.voice.setDeaf(true)
            });
            message.channel.send("Everyone has been silenced.");
    }
}