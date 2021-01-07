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
            message.channel.send()
            

        }
        scrapeCodeWars();
    }
}