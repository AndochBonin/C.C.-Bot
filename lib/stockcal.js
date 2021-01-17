const stock = require('finance.io');
const debug = require('debug')('c.c-bot:stock-calculator')

class Stock{
    constructor (){
        numStock = 0;
        currentPrice = 0;
    }
    get getStock(){
        return this;
    }
    getInfo(param){
       stock.getInfo(param).then( (data) => {
            let stockStr = JSON.stringify(data, null, 4);
            let stockObj = JSON.parse(stockStr);
            const currP = stockObj.currentPrice;
            this.currentPrice = currP;
        }).catch(err=>{
            
        });
    }
}