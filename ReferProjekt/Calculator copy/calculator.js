//const keys = document.querySelectorAll('.gomba');
//const display_input = document.querySelector('.kijelzo .kijelzobe');
//const display_output = document.querySelector('.kijelzo .kijelzoki');

class Calculator {
    constructor(smallDisplayTextElement, bigDisplayTextElement) {
        this.smallDisplayTextElement = smallDisplayTextElement
        this.bigDisplayTextElement = bigDisplayTextElement
        this.clear()
    }

    clear() {
        this.bigDisplay = ''
        this.smallDisplay = ''
        this.operation = undefined
    }

    delete() {
        this.bigDisplay = this.bigDisplay.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.bigDisplay.includes('.')) return
        this.bigDisplay = this.bigDisplay.toString() + number.toString()
    }

    choseOperation(operation) {
        if (this.bigDisplay == "") return
        if (this.smallDisplay !== "") {
            this.compute()
        }
        this.operation = operation
        this.smallDisplay = this.bigDisplay
        this.bigDisplay = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.smallDisplay)
        const current = parseFloat(this.bigDisplay)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.bigDisplay = computation
        this.operation = undefined
        this.smallDisplay = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.'))
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('hu', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}. ${decimalDigits}`
        }
        else {
            return integerDisplay
        }
        /*const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('hu')*/
    }

    updateDisplay() {
        this.bigDisplayTextElement.innerText = this.getDisplayNumber(this.bigDisplay)
        if (this.operation != null) {
            this.smallDisplayTextElement.innerText = `${this.getDisplayNumber(this.smallDisplay)} ${this.operation}`
        }

        else {
            this.smallDisplayTextElement.innerText = ''
        }

    }
}

//let input = document.querySelector('.kijelzo');
//let gombok = document.querySelectorAll('button');
//
let operatorButtons = document.querySelectorAll('.muveletGomb');
let numberButtons = document.querySelectorAll('.szam');
let equalButton = document.querySelector('#egyenlo');
let clearButton = document.querySelector('.acGomb');
let delButton = document.querySelector('.delGomb');
let smallDisplayTextElement = document.querySelector('#kisKijelzo')
let bigDisplayTextElement = document.querySelector('#nagyKijelzo')

let calculator = new Calculator(smallDisplayTextElement, bigDisplayTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

//

const keyPressedNumbersAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+', 'Enter'];

document.addEventListener("keydown", whatKey);
function whatKey(event) {
    const keyPressed = event.key;
    if (keyPressedNumbersAllowed.includes(keyPressed)) {
        calculator.appendNumber(keyPressed)
        calculator.updateDisplay()
    }
    else if (keyPressed == "Enter") {
        calculator.compute()
        calculator.updateDisplay()
    }

    else if (keyPressed == "+") {
        calculator.choseOperation(keyPressed)
        calculator.updateDisplay()
    }

    else if (keyPressed == "/") {
        calculator.choseOperation(keyPressed)
        calculator.updateDisplay()
    }

    else if (keyPressed == "*") {
        calculator.choseOperation(keyPressed)
        calculator.updateDisplay()
    }

    else if (keyPressed == "-") {
        calculator.choseOperation(keyPressed)
        calculator.updateDisplay()
    }

    else if (keyPressed == "+") {
        calculator.choseOperation(keyPressed)
        calculator.updateDisplay()
    }

    else if (keyPressed == "Backspace") {
        calculator.delete()
        calculator.updateDisplay()
    }

    else if (keyPressed == "Delete") {
        calculator.clear()
        calculator.updateDisplay()
    }

    else {
        return
    }
}



/*
let string = "";
let arr = Array.from(gombok);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            if (input.innerHTML == "") {
                input.innerHTML = "0";
                string = "0";
            }

            else if (input.innerHTML == "0") {
                input.innerHTML = "0";
                string = "0";
            }

            else if (input.innerHTML == ".") {
                input.innerHTML = "0";
                string = "0";
            }
            else {
                string = String(eval(string));
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == 'AC') {
            string = "";
            input.innerHTML = string;
        }

        else if (e.target.innerHTML == 'C') {
            string = string.substring(0, string.length - 1);
            input.innerHTML = string;
        }

        else if (e.target.innerHTML == '+/-') {
            string = -1 * string;
            input.innerHTML = string;
        }


        else if (e.target.innerHTML == '0') {
            if (input.innerHTML == "0") {
                input.innerHTML = "0";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '1') {
            if (input.innerHTML == "0") {
                input.innerHTML = "1";
                string = "1";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '2') {
            if (input.innerHTML == "0") {
                input.innerHTML = "2";
                string = "2";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '3') {
            if (input.innerHTML == "0") {
                input.innerHTML = "3";
                string = "3";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '4') {
            if (input.innerHTML == "0") {
                input.innerHTML = "4";
                string = "4";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '5') {
            if (input.innerHTML == "0") {
                input.innerHTML = "5";
                string = "5";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '6') {
            if (input.innerHTML == "0") {
                input.innerHTML = "6";
                string = "6";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '7') {
            if (input.innerHTML == "0") {
                input.innerHTML = "7";
                string = "7";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '8') {
            if (input.innerHTML == "0") {
                input.innerHTML = "8";
                string = "8";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '9') {
            if (input.innerHTML == "0") {
                input.innerHTML = "9";
                string = "9";
            }
            else {

                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else if (e.target.innerHTML == '.') {
            if (input.innerHTML.includes(".")) {
                return
            }

            else if (input.innerHTML == "") {
                return
            }
            else {
                string += e.target.innerHTML;
                input.innerHTML = string;
            }
        }

        else {
            string += e.target.innerHTML;
            input.innerHTML = string;
        }

    })


})

*/