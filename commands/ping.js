module.exports = {
    name: 'ping',
    description: 'sends the bots ping',
    execute(message, args) {
        let ping = Math.abs(Date.now() - message.createdTimestamp);
        message.channel.send('```yaml' + '\n' + 'Pinging...' + '\n' + 
        'Latency is ' + ping + 'ms' + '\n' + '```');
    }
}