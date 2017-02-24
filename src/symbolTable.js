const defaultSymbols = require("../constants/symbols.js");

class SymbolTable {
    constructor() {
        this._symbols = Object.assign({}, defaultSymbols);
        this._variableCount = 16;
    }

    addEntry(symbol, address) {
        if (address === undefined) {
            address = this._variableCount;
            this._variableCount += 1;
        }
        this._symbols[symbol] = address;
        return address;
    }

    contains(symbol) {
        return this._symbols[symbol] !== undefined;
    }

    getAddress(symbol) {
        return this._symbols[symbol];
    }
}

module.exports = SymbolTable;
