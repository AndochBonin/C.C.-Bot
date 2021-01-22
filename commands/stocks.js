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

        if (args[1] == 'portfolio'){
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
            if (args[0].toLowerCase() in userStocks == false){
                "You do not own shares in the company.";
                return;
            }
            let color;
            if (userStocks[args[0].toLowerCase()].profit >= 0){
                color = "#00FF00";
            } else {
                color = "#FF0000";
            }

            stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                        let stockObj = JSON.parse(stockStr);
                        userStocks[args[0].toLowerCase()].profit =
                        userStocks[args[0].toLowerCase()].numberOfStocks * MyStock.currentPrice - userStocks[stockName].totalSpentOnStock;
                        jsonfile.writeFileSync('stocks.json', stocks);
                    })

            const statsEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(args[0].toUpperCase() + " Portfolio")
                .addFields(
                    {name: "Shares", value: userStocks[args[0].toLowerCase()].numberOfStocks},
                    {name: "Spent On Stock", value: userStocks[args[0].toLowerCase()].totalSpentOnStock},
                    {name: "Profit", value: userStocks[args[0].toLowerCase()].profit}
                )
            message.channel.send(statsEmbed);
            return;
        }

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
        } else if (args[1] && args[1] == 'buy'){
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

            if (args[0].toLowerCase() in userStocks == false) {
                stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                        let stockObj = JSON.parse(stockStr);
                        userStocks[args[0].toLowerCase()] = {
                            numberOfStocks: Number(args[2]) / stockObj.currentPrice,
                            totalSpentOnStock: Number(args[2]),
                            profit: 0,
                        };
                        jsonfile.writeFileSync('stocks.json', stocks);
                    })
                message.channel.send("You have bought " + args[0].toUpperCase() + " stocks!");
                guildStats[message.author.id].money -= args[2];
                jsonfile.writeFileSync('stats.json', stats);
            } else {
                stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                        let stockObj = JSON.parse(stockStr);
                        userStocks[args[0].toLowerCase()].numberOfStocks += Number(args[2]) / stockObj.currentPrice;
                        userStocks[args[0].toLowerCase()].totalSpentOnStock += Number(buyAmount);
                        userStocks[args[0].toLowerCase()].profit =
                        userStocks[args[0].toLowerCase()].numberOfStocks * MyStock.currentPrice - userStocks[stockName].totalSpentOnStock;
                        jsonfile.writeFileSync('stocks.json', stocks);
                    })
                message.channel.send("You have bought " + args[0].toUpperCase() + " stocks!");
                guildStats[message.author.id].money -= args[2];
                jsonfile.writeFileSync('stats.json', stats);
            }
        }
        else if (args[1] && args[1] == 'sell'){
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
            if (!args[2]) {
                message.channel.send('Choose a number of stocks to sell.');
                return;
            }
            if (args[2] > userStocks.numberOfStocks) {
                message.channel.send('You do not have sufficient stocks.');
                return;
            }

            if (args[0].toLowerCase() in userStocks == false) {
                message.channel.send("You do not have any shares in this company.");
                return;
            } else {
                stock
                    .getInfo(args[0])
                    .then((data) => {
                        let stockStr = JSON.stringify(data, null, 4);
                        let stockObj = JSON.parse(stockStr);
                        userStocks[args[0].toLowerCase()].totalSpentOnStock -= 
                        Number(args[2]) / numberOfStocks * 100 * userStocks[args[0].toLowerCase()].totalSpentOnStock;
                        userStocks[args[0].toLowerCase()].numberOfStocks -= Number(args[2]);
                        userStocks[args[0].toLowerCase()].profit =
                        userStocks[args[0].toLowerCase()].numberOfStocks * MyStock.currentPrice - userStocks[stockName].totalSpentOnStock;
                        guildStats[message.author.id].money += args[2] * stockObj.currentPrice;
                        jsonfile.writeFileSync('stats.json', stats);
                        jsonfile.writeFileSync('stocks.json', stocks);
                    })
                message.channel.send("You have sold " + args[0].toUpperCase() + " stocks!");
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
