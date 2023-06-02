export const saveData = (key, data) => {
    localStorage.setItem(key, data)
}

export const retrieveData = (key, defaultValue) => {
    return localStorage.getItem(key) || defaultValue
}

//perform calculation
export const performCalculation = (op, arg1, arg2) => {
    switch (op) {
        case '/': return calculate(arg1 *10 / arg2)
        case 'x': return calculate(arg1 * arg2 * 10)
        case '+': return calculate(arg1*10 + arg2*10)
        case '-': return calculate(arg1*10 - arg2*10)
        default: break;
    }
}

function calculate(value) {
    let result = value / 10
    // limit to 15 digit
    result = result?.toString()
    if (result.length > 9) {
        result = Number(result.slice(0, 9))
    }
    return result
}

