module.exports = {
    name: 'clear',
    description: "clears a specified number of messages",
    async execute(message, args) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.send("You do not have the right geass for this.");
            return;
        }

        if (!args[0] || isNaN(args[0])) {
            return message.reply('Specify a number.');
        }

        if (args[0] > 500 || args[0] < 1) {
            return message.reply('Beyond your limits.');
        }

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}