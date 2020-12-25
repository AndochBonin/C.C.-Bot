module.exports = {
    name: 'devMess',
    description: 'sends a message to the channel in the form of an embed',
    async execute (message, args, Discord){
        if (message.member.user.id !== "391199878015090689"){
            message.channel.send("You do not have the right geass for this.");
        }
        if (!args[0]) {
            return message.reply('No developer message found.');
        }
        const messEmbed = new Discord.MessageEmbed()
        .setTitle("Announcement")
        .addFields(
            {name: '@everyone', value: args},
        )
        message.channel.send(messEmbed);

        await message.channel.messages.fetch({limit: 1}).then(messages => {
            message.channel.bulkDelete(messages);
        });
        //message.channel.send('hello');
    }
}