const puppeteer = require('puppeteer');
const fs = require('fs');
const jsonfile = require('jsonfile');

module.exports = {
    name: 'codeLeaders',
    description: "sends codewars leaderboard",
    execute (message, args){
        async function scrapeCodeWars(url){
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            page.goto(url);
            const [el] = await page.$x('//*[@id="shell_content"]/div[5]/div/div[1]/div/section/div[1]/div/div[1]/div[2]/text()');

            message.channel.send()
            

        }
        scrapeCodeWars();


        const leadersEmbed = new Discord.MessageEmbed()
        .setColor("#800080")
        .setTitle(title)
        .addFields(
            {name: "1st - " + people[0].name, value: "**----- " + people[0].field + "**"},
            {name: "2nd - " + people[1].name, value: "**----- " + people[1].field + "**"},
            {name: "3rd - " + people[2].name, value: "**----- " + people[2].field + "**"},
            {name: "4th - " + people[3].name, value: "**----- " + people[3].field + "**"},
            {name: "5th - " + people[4].name, value: "**----- " + people[4].field + "**"},
        )
    }
}