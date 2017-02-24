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
const SourceL = readSourceFile(path.join(path.dirname(__filename), "../../max/MaxL.asm"));
const OutputL = readOutputFile(path.join(path.dirname(__filename), "../../max/MaxL.hack"));

const Source = readSourceFile(path.join(path.dirname(__filename), "../../max/Max.asm"));
const Output = readOutputFile(path.join(path.dirname(__filename), "../../max/Max.hack"));

describe('Max assembly', function() {
    it("should produce correct machine codes (no symbols)", () => {
        assembler.assemble(SourceL).should.deep.equal(OutputL);
    });

    it("should produce correct machine codes (with symbols)", () => {
        assembler.assemble(Source).should.deep.equal(Output);
    });
});