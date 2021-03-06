const fs = require("fs");
const path = require("path");
const chai = require("chai");
const should = chai.should();
const assembler = require("../src/assembler.js");

function readSourceFile(filename) {
    const fileData = fs.readFileSync(filename, {encoding: "ascii"});
    const sourceCode = fileData.split("\r\n");
    return sourceCode;
}

function readOutputFile(filename) {
    const fileData = fs.readFileSync(filename, {encoding: "utf8"});
    const sourceCode = fileData.split("\n").filter(val => val !== "");
    return sourceCode;
}
const source = readSourceFile(path.join(path.dirname(__filename), "../../add/Add.asm"));
const output = readOutputFile(path.join(path.dirname(__filename), "../../add/Add.hack"));

describe('Add assembly', function() {
    it("should produce correct machine codes", () => {
        assembler.assemble(source).should.deep.equal(output);
    });
});