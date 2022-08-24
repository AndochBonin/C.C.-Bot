const puppeteer = require('puppeteer');
const fs = require('fs');
const jsonfile = require('jsonfile');


module.exports = {
    name: 'codeLeaders',
    description: "sends codewars leaderboard",
    execute (message, args, Discord){
        
        message.delete({timeout: 60000});
        let codeArr = [];
        let size = 0;
        async function scrapeCodeWars(id, url){
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            
            const [el] = await page.$x('//*[@id="shell_content"]/div[5]/div/div[1]/div/section/div[1]/div/div[1]/div[2]/text()');
            const txt = await el.getProperty('innerHTML');
            const rawText = await txt.jsonValue();

            let obj = {
                name: id,
                points: Number(rawText),
            }
            codeArr.push(obj);
            browser.close();
        }
        async function scrape (){
            await scrapeCodeWars('Lelouch', 'https://www.codewars.com/users/Lelouch%20Vi%2033');
            await scrapeCodeWars('Ghadi', 'https://www.codewars.com/users/GhadiAgha');
            await scrapeCodeWars('Amen', 'https://www.codewars.com/users/Amenoreys');
            await scrapeCodeWars('Geoffrey', 'https://www.codewars.com/users/AceOfTheHood');
            await scrapeCodeWars('Senku', 'https://www.codewars.com/users/0xBADC0D3');
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
                {name: "3rd - " + codeArr[2].name, value: "**----- " + codeArr[2].points + "**"},
                {name: "4th - " + codeArr[3].name, value: "**----- " + codeArr[3].points + "**"},
                {name: "5th - " + codeArr[4].name, value: "**----- " + codeArr[4].points + "**"},
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