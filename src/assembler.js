const fs = require("fs");
const parser = require("./parser.js");
const coder = require("./coder.js");
const SymbolTable = require("./symbolTable");
const path = require("path");


function assemble(sourceCode) {
    let romCounter = 0;
    let output = [];
    let symbolTable = new SymbolTable();

    // First pass: Symbol lookup
    sourceCode.forEach(line => {
        const cmd = parser.parse(line);
        if (cmd.type === "A" || cmd.type === "C") {
            romCounter += 1;
        }
        if (cmd.type === "L") {
            if (!symbolTable.contains(cmd.symbol)) {
                symbolTable.addEntry(cmd.symbol, romCounter);
            }
        }
    });
    // Second pass: Machine code translation
    sourceCode.forEach(line => {
        const cmd = parser.parse(line);
        if (cmd.type === "A" || cmd.type === "C") {
            const machineCode = coder.code(cmd, symbolTable);
            output.push(machineCode);
        }
    });
    return output;
}

function readSourceFile(filename) {
    const fileData = fs.readFileSync(filename, {encoding: "ascii"});
    const sourceCode = fileData.split("\r\n");
    return sourceCode;
}

function writeOutputFile(assemblyCode, filename) {
    const baseName = path.basename(filename, ".asm");
    let file = fs.createWriteStream(`${baseName}.hack`);
    assemblyCode.forEach(v => file.write(v + "\r\n"));
    file.end();
};

module.exports = {
    assemble,
    readSourceFile,
    writeOutputFile
};