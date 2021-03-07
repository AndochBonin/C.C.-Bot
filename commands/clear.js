module.exports = {
    name: 'clear',
    description: "clears a specified number of messages",
    async execute(message, args) {

        if (!args[0] || isNaN(args[0])) {
            return message.reply('Specify a number.');
        }

        if (args[0] > 500 || args[0] < 1) {
            return message.reply('Beyond your limits.');
        }
        try {
            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages);
            });
        }
        catch(error){
            message.channel.send("This is not a number.");
        }
    }
}