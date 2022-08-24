const stock = require('finance.io');
const debug = require('debug')('c.c-bot:stock-calculator');

class StockCal {
    constructor() {
        this.numStock = 0;
        this.currentPrice = 0;
    }
    get getStock() {
        return this;
    }
    getInfo(param) {
        stock
            .getInfo(param.query)
            .then((data) => {
                let stockStr = JSON.stringify(data, null, 4);
                let stockObj = JSON.parse(stockStr);
                const currP = stockObj.currentPrice;
                this.currentPrice = currP;
                this.numStock = param.money / this.currentPrice;
                debug('Updated price: ', this.currentPrice);
                debug('Numstock: ', this.numStock);
            })
            .catch((err) => {
                debug(err);
            });
    }
}

module.exports = StockCal;
