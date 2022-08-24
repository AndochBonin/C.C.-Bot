const puppeteer = require('puppeteer');
const fs = require('fs');
const jsonfile = require('jsonfile');


module.exports = {
    name: 'hackLeaders',
    description: "sends tryhackme leaderboard",
    execute (message, args, Discord){
        
        message.delete({timeout: 60000});
        let codeArr = [];
        let size = 0;

        async function scrapeCodeWars(id, url){
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            
            const [el] = await page.$x('//*[@id="user-rank"]');
            const txt = await el.getProperty('textContent');
            let rawText = await txt.jsonValue();
            //rawText = rawText.slice(7);

            let obj = {
                name: id,
                points: rawText,
            }
            codeArr.push(obj);
            browser.close();
        }
        async function scrape (){
            await scrapeCodeWars('Lelouch', 'https://tryhackme.com/p/LelouchVi33');
            await scrapeCodeWars('Senku', 'https://tryhackme.com/p/senku404');
        }

        function sortAndSend(){
            
            for (let i = 0; i < codeArr.length; i++) {
                for (let j = 0; j < codeArr.length - 1; j++) {
                    if (codeArr[j].points < codeArr[j + 1].points) {
                        let tmp = codeArr[j];
                        codeArr[j] = codeArr[j + 1];
                        codeArr[j + 1] = tmp;
                    }
                }
            }

            const leadersEmbed = new Discord.MessageEmbed()
            .setColor("#800080")
            .setTitle("Codewars Leaderboard")
            .addFields(
                {name: "1st - " + codeArr[0].name, value: "**----- " + codeArr[0].points + "**"},
                {name: "2nd - " + codeArr[1].name, value: "**----- " + codeArr[1].points + "**"},
            )
            message.channel.send(leadersEmbed).then(msg => { msg.delete({timeout: 60000}) });
        }

        async function everything(){
            message.channel.send('Scraping the web... Please wait.').then(msg => { msg.delete({timeout: 60000}) });
            await scrape();
            await sortAndSend();
        }

        everything();

    }
}