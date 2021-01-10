const { MessageAttachment } = require('discord.js');
const stock = require('finance.io')
const puppeteer = require('puppeteer');

module.exports = {
    name: 'stocks',
    description: 'shows top stock prices if no args are passed.',
    execute(message, args, Discord){
        message.delete();

        if (args[1] && args[1] == 'graph'){
            try {
                stock.getInfo(args[0]).then( (data) => {
                    let stockStr = JSON.stringify(data, null, 4);
                }).catch( (err) => {
                    message.channel.send("Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener");
                    return;
                });
            } catch (error){
                message.channel.send("Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener");
                return;
            }
            //message.channel.send('hi');
            async function getGraph(){
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({ width: 1280, height: 720 })
                await page.goto('https://google.com');
                await page.type('input.gLFyf.gsfi', args[0] + ' share price');
                page.keyboard.press('Enter');
                await page.waitForSelector('div#result-stats');
                await page.screenshot({ path: './images/screenshot.png' });
                
                browser.close();
                const graphAttach = new MessageAttachment('./images/screenshot.png');
                message.channel.send(graphAttach);
                
            }
            getGraph();

        }
        if (!args[1]){
        try {
            stock.getInfo(args[0]).then( (data) => {
                let stockStr = JSON.stringify(data, null, 4);
                let stockObj = JSON.parse(stockStr);
                const stocksEmbed = new Discord.MessageEmbed()
                    .setColor("#FFA500")
                    .setTitle(args[0].toUpperCase() + " Info")
                    .addFields(
                        {name: "Current Price: " + stockObj.currentPrice + " :dollar:", value: stockObj.returnOnEquityFormat},
                    )
                message.channel.send(stocksEmbed).then(msg => { msg.delete({timeout: 60000}) });
                //message.channel.send(stockObj.currentPrice);
            }).catch( (err) => {
                message.channel.send("Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener");
            });
        } catch (error){
            message.channel.send("Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener")
        }
    }
}
}