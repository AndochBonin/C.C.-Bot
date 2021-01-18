const { MessageAttachment } = require('discord.js');
const stock = require('finance.io');
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
const fs = require('fs');
const jsonfile = require('jsonfile');
const StockCal = require('../lib/stockcal');
const debug = require('debug')('c.c-bot:stock-methods');
var stocks = {};
if (fs.existsSync('stocks.json')) {
    stocks = jsonfile.readFileSync('stocks.json');
}

var stats = {};
if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}
const guildStats = stats['738087569325293728'];

module.exports = {
    name: 'stocks',
    description: 'shows top stock prices if no args are passed.',
    execute(message, args, Discord) {
        message.delete();

        const guildStocks = stocks['738087569325293728'];
        if (
            message.author.id in guildStocks === false &&
            message.guild.id === '738087569325293728'
        ) {
            guildStocks[message.author.id] = {};
        }
        const userStocks = guildStocks[message.author.id];

        if (args[1] && args[1] == 'graph') {
            try {
                stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                    })
                    .catch((err) => {
                        message.channel.send(
                            'Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener'
                        );
                        return;
                    });
            } catch (error) {
                message.channel.send(
                    'Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener'
                );
                return;
            }
            //message.channel.send('hi');
            async function getGraph() {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({ width: 1280, height: 720 });
                await page.goto('https://google.com');
                await page.type('input.gLFyf.gsfi', args[0] + ' share price');
                page.keyboard.press('Enter');
                await page.waitForSelector('div#result-stats');
                await page.screenshot({ path: './images/screenshot.png' });

                browser.close();
                const graphAttach = new MessageAttachment(
                    './images/screenshot.png'
                );
                message.channel.send(graphAttach);
            }
            getGraph();
        } else if (args[1] && args[1] == 'buy') {
            try {
                stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                    })
                    .catch((err) => {
                        message.channel.send(
                            'Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener'
                        );
                        return;
                    });
            } catch (error) {
                message.channel.send(
                    'Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener'
                );
                return;
            }
            //
            if (!args[2]) {
                message.channel.send('Choose an amount in dollars to buy.');
                return;
            }
            if (args[2] > guildStats[message.author.id].money) {
                message.channel.send('You do not have sufficient funds.');
                return;
            }

            const MyStock = new StockCal();
            MyStock.getInfo({ query: args[0], money: args[2] });
            debug(MyStock.getStock);
            let stockName = args[0];
            let buyAmount = Number(args[2]);

            if (args[0] in userStocks == false) {
                userStocks[stockName] = {
                    numberOfStocks: MyStock.numStock,
                    totalSpentOnStock: Number(buyAmount),
                    profit: 0,
                };

                jsonfile.writeFileSync('stocks.json', stocks);
                jsonfile.writeFileSync('stats.json', stats);
            } else {
                userStocks[stockName].numberOfStocks += MyStock.numStock;
                userStocks[stockName].totalSpentOnStock += Number(buyAmount);
                userStocks[stockName].profit =
                    userStocks[stockName].numberOfStocks *
                        MyStock.currentPrice -
                    userStocks[stockName].totalSpentOnStock;

                jsonfile.writeFileSync('stocks.json', stocks);
                jsonfile.writeFileSync('stats.json', stats);
            }
        }

        if (!args[1]) {
            try {
                stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                        let stockObj = JSON.parse(stockStr);
                        const stocksEmbed = new Discord.MessageEmbed()
                            .setColor('#FFA500')
                            .setTitle(args[0].toUpperCase() + ' Info')
                            .addFields({
                                name:
                                    'Current Price: ' +
                                    stockObj.currentPrice +
                                    ' :dollar:',
                                value: stockObj.returnOnEquityFormat,
                            });
                        message.channel.send(stocksEmbed).then((msg) => {
                            msg.delete({ timeout: 60000 });
                        });
                        //message.channel.send(stockObj.currentPrice);
                    })
                    .catch((err) => {
                        message.channel.send(
                            'Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener'
                        );
                    });
            } catch (error) {
                message.channel.send(
                    'Use the security symbol of the company. e.g (TSLA).\nUse this link as a reference.\nhttps://www.nasdaq.com/market-activity/stocks/screener'
                );
            }
        }
    },
};
