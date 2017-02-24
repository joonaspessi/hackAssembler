const fs = require("fs");
const program = require("commander");
const assembler = require("./src/assembler");

program
  .version("0.0.1")
  .command("*")
  .action(function (filename) {
        const sourceCode = assembler.readSourceFile(filename);
        const assembly = assembler.assemble(sourceCode);
        assembler.writeOutputFile(assembly, filename);
   })
  .parse(process.argv);
