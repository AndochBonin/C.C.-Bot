module.exports = {
    name: 'unmuteAll',
    description: "unmutes everyone on the voice channel",
    execute(message, args) {

        const channel = message.channel
        const members = channel.members
        if (!message.member.hasPermission('MUTE_MEMBERS')){
            message.channel.send("You do not have the right geass for this.");
            return;
        }
            members.forEach(member => {
                member.voice.setMute(false).catch();
                //member.voice.setDeaf(false)
            });
            message.channel.send("Everyone has been unsilenced.");
    }
}