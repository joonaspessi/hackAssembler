function parse(line) {
    // Remove everything after comments
    // First regex removes everything after comment char
    // Second regex trims all spaces from line
    const lineTrimmed = line.replace(/\/\/.*$/, "").replace(/\s+/g, '');

    // EmptyLine or comment line
    if (lineTrimmed === "") {
        return {
            type: "EMPTY"
        }
    } else {
        if (_isA(lineTrimmed)) {
            return _parseA(lineTrimmed);
        } else if(_isL(lineTrimmed)) {
            return _parseL(lineTrimmed);
        } else {
            return _parseC(lineTrimmed);
        }
    }
}

function _isA(line) {
    return line[0] === "@";
}

function _isL(line) {
    return line[0] === "(";
}

function _parseA(line) {
    // strip @ from beginning;
    const symbol = line.slice(1);
    return {
        type: "A",
        symbol: symbol
    };
}

function _parseC(line) {
    let dest;
    let comp;
    let jump;
    if (line.indexOf(";") !== -1) {
        dest = "null";
        comp = line.slice(0,line.indexOf(";"));
        jump = line.slice(line.indexOf(";") + 1)
    } else {
        dest = line.slice(0,line.indexOf("="));
        comp = line.slice(line.indexOf("=") + 1);
        jump = "null";
    }
    return {
        type: "C",
        dest: dest,
        comp: comp,
        jump: jump
    };
}

function _parseL(line) {
    const symbol = line.slice(1, -1);
    return {
        type: "L",
        symbol: symbol
    };
}

module.exports = {
    parse
};
