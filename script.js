class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // AC
    clear() {
        // content to be displayed in my current and previous
        // ye sabhi yaha pe strings h
        this.currentOperand = " ";
        this.previousOperand = " ";
        this.operation = undefined;
    }

    // DEL
    delete() {
        // returns a section of string
        // end index is exclusive
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // number buttons
    appendNumber(number) {
        // the thing is it considers period as a number too but we dont want that 
        // to avoid multiple periods we will avoid appending it if we click it and have already appended it
        // number -> the clicked number [.]
        // this.currentOperand. -> display area 
        if (number === '.' && this.currentOperand.includes('.')) {
            // stop from executing it 
            return;
        }
        // we convert to string so that number append not add
        // or we can say we want numbers as string to add not add as numbers
        this.currentOperand = this.currentOperand.toString() + number.toString();
        console.log(this.currentOperand);
        console.log(number);
    }

    // operation buttons
    chooseOperation(operation) {
        // the thing is initially also we would want our current to be in current but below does not alloww that 
        // so if we have empty current then stay therre else below may execute
        if (this.currentOperand === '') {
            // don't execute below
            return;
        }
        // but if not empty then as soon as we click operation we had want to compute first then append to previous display
        if (this.previousOperand !== '') {
            this.compute();
        }
        console.log(this.previousOperand);
        // what we want here is that as soon as we select our operation we would want our current to go to previous 
        this.operation = operation;
        // prev ko current dedo
        this.previousOperand = this.currentOperand;
        // current ko fresh krdo
        this.currentOperand = '';
        // abhi update bhi krna h display pe so lets do that
    }

    // calculate result using previous , current , operation , number
    compute() {
        let computation
        // parseFloat is used to convert strings to floating-point numbers.
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // isNaN is a JavaScript function that determines whether a value is NaN (Not-a-Number). It is useful for validating inputs and ensuring that computations involve valid numbers.
        // invalid number pe don't compute just end there
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        // operation ke baad dusra number click krke equal click krte hi current mien result display hogi 
        // and prev phirse khali
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = " ";
    }

    // ab commas bhi display krne h hume toh 
    getDisplayNumber(number) {
        // since at period this number will start acting weirdly so we need to do smthn abt it
        // we change to string since we are not sure ki vo string hya phir number
        const stringNumber = number.toString();
        // we will beautify this number with commas
        // convert str -> num
        // integer and decimal value ko thoda alag se lelo split krke

        // stringNumber.split('.'): This splits the stringNumber at the decimal point . into an array of two parts: the integer part and the decimal part.
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        // agar num nhi h to mat display karo
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        // vrna integer display kar do
        else {
            // .toLocaleString('en', { maximumFractionDigits: 0 }): This method converts the number to a string, formatted according to the specified locale and options.
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        // agar decimal ho to aese return kardo
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        // vrna sirf integer hi display kardo
        else {
            return integerDisplay;
        }
    }

    // final result
    updateDisplay() {
        // change the deafault to users clicked number
        // div where it will be displayed
        // bss ab getDisplayNumber jo bhi de vahi display krne ka h
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        // abhi display mien operation displayed nhi h sundar nhi h 
        if (this.operation !== null) {
            // updating previous=current value
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

// select all the buttons and initialize them
const operationButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const allClearButtons = document.querySelector("[data-all-clear]");
const deleteButtons = document.querySelector("[data-delete]");
const equalsButtons = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// call the class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// select all the buttons from numberbtn
numberButtons.forEach(button => {
    // when they are clicked
    // append that number to appendnum fxn 
    // then display it 
    button.addEventListener('click', () => {
        // this will select that clicked number for us and pass it to our fxn where we can work with it further
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

// select all the operation buttons 
operationButtons.forEach(button => {
    // when they are clicked
    // append that operation to display
    // then perform calc over it 
    button.addEventListener('click', () => {
        // this will select that clicked operation for us and pass it to our fxn where we can work with it further
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

// select equal to button
equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// select allClear to button
allClearButtons.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// select delete to button
deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})