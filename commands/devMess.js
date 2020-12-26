module.exports = {
    name: 'devMess',
    description: 'sends a message to the channel in the form of an embed',
    async execute (message, par, Discord){
        if (message.member.user.id !== "391199878015090689"){
            message.channel.send("You do not have the right geass for this.");
        }
        if (!par[0]) {
            return message.reply('No developer message found.');
        }
        let str = par.slice(7);
        let title = str.slice(0, str.indexOf("\n"));
        str = str.slice(str.indexOf("\n") + 1);
        let color = "#FF0000";
        let gif = "https://i.pinimg.com/originals/8d/36/99/8d3699ec73c3963338cb88ab07dd43ae.gif";
        switch (title.trim()){
            case "NF":
                title = "NEW FEATURE!";
                color = "#32CD32";
                gif = "https://49.media.tumblr.com/3c5e0c52e36d2d74ef0e7790051ed1a9/tumblr_muf5n10Beb1rs4yfmo1_500.gif";
                break;
            case "FD":
                title = "FEATURE DISABLED";
                color = "#4B0082";
                gif = "https://static.zerochan.net/C.C..full.2693876.gif";
                break;
            case "LA":
                title = "Announcement From Lelouch Vi 33";
                break;
        }
        const messEmbed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .addFields(
            {name: 'Greetings, Lelouch commands your attention', value: str},
        )
        .setImage(gif)
        .setFooter("all conditions have now been cleared.")
        await message.channel.messages.fetch({limit: 1}).then(messages => {
            message.channel.bulkDelete(messages);
        });
        message.channel.send(messEmbed);
        //message.channel.send('hello');
    }
}