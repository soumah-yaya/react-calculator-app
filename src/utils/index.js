export const saveData = (key, data) => {
    localStorage.setItem(key, data)
}

export const retrieveData = (key, defaultValue) => {
    return localStorage.getItem(key) || defaultValue
}

//perform calculation
export const performCalculation = (op, arg1, arg2) => {
    let op1 = parseFloat(arg1)
    let op2 = parseFloat(arg2)
    switch (op) {
        case '/': return calculate(op1 / op2)
        case 'x': return calculate(op1 * op2)
        case '+': return calculate((op1*10 + op2*10)/10)
        case '-': return calculate(op1 - op2)
        default: break;
    }
}

function calculate(value) {    
    let result = value?.toString()
    if (result.length > 9) {
        result = result.slice(0, 9)
    }
    return result
}

