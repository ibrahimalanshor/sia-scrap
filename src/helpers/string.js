function getOperatorName (str) {
    const operatorNames = {
        'ditambah': 'sum',
        '+': 'sum'
    }

    return operatorNames[str]
}

exports.extractMath = function extractMath(str) {
    const [firstValue, operator, lastValue] = str.split(' ')
        .filter(char =>
            new RegExp('[0-9]').test(char) ||
            new RegExp('[+-/x]').test(char) ||
            ['ditambah'].includes(char)
        )
        .map(char => new RegExp('[0-9]').test(char) ? parseInt(char.replace(/\D/g, '')) : char)

    return {
        firstValue,
        operator: getOperatorName(operator),
        lastValue 
    }
}