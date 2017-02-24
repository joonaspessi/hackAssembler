const CINS = require("../constants/CInstructions.js");
const path = require("path");

function _pad(n, width) {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

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
    // @Todo lookup from symbol symbolTable
    const binary = address.toString(2);
    const binary15Bit = _pad(binary, 15);
    return `0${binary15Bit}`;
}

/**
 *  type: "C",
 *  dest: dest
 *  comp: comp
 *  jump: jump
*/
function _codeC(cmd, symbolTable) {
    const dest = CINS.dest[cmd.dest];
    const comp = CINS.comp[cmd.comp];
    const jumpCmd = cmd.jump === "" ? "null" : cmd.jump;
    const jump = CINS.jmp[jumpCmd];
    return `111${comp}${dest}${jump}`;
}

module.exports = {
    code
};