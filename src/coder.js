const CINS = require("../constants/cIns.js");
const path = require("path");

function code(cmd, symbolTable) {
    if (cmd.type === "A") {
        return _codeA(cmd, symbolTable);
    } else if (cmd.type === "C") {
        return _codeC(cmd, symbolTable);
    } else if (cmd.type === "L") {
        return "@todo";
    }
}

function _codeA(cmd, symbolTable) {
    const symbol = cmd.symbol;
    let address = Number(cmd.symbol);
    if (Number.isNaN(address)) {
        if (symbolTable.contains(cmd.symbol)) {
            address = symbolTable.getAddress(cmd.symbol);
        } else {
            address = symbolTable.addEntry(cmd.symbol, undefined);
        }
    }
    const binary = address.toString(2);
    const binary15Bit = _pad(binary, 15);
    return `0${binary15Bit}`;
}

function _codeC(cmd, symbolTable) {
    const dest = CINS.dest[cmd.dest];
    const comp = CINS.comp[cmd.comp];
    const jumpCmd = cmd.jump === "" ? "null" : cmd.jump;
    const jump = CINS.jmp[jumpCmd];
    return `111${comp}${dest}${jump}`;
}

function _pad(n, width) {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

module.exports = {
    code
};
