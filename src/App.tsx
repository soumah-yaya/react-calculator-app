import React, { useState } from 'react';
import './App.css';
import { Header, Keypad, Screen } from './components';
import { retrieveData, performCalculation } from './utils';

type AppType = {
  firstOperand: number | boolean,
  isWaitingForSecondOperand: boolean,
  operator: string,
  display: string,
  isSubmitted: boolean,
}


function App() {

  const [theme, setTheme] = useState(retrieveData('theme', 'theme1'))

  const [calculator, setCalculator] = useState<AppType>({
    isWaitingForSecondOperand: false,
    firstOperand: false,
    operator: '',
    display: '0',
    isSubmitted: false,
  })

  // reset all 
  const handleResetClick = () => (
    setCalculator({
      ...calculator,
      isWaitingForSecondOperand: false,
      firstOperand: false,
      operator: '',
      display: '0',
      isSubmitted: false,
    })
  )


  //handle numeric input
  const handleDigitInput = (digit: number) => {
    const { isWaitingForSecondOperand, isSubmitted, display } = calculator
    let disp = display

    if (disp === '0' || isWaitingForSecondOperand || isSubmitted) {
      disp = digit + ''
    } else {
      disp = disp + digit + ''
    }

    // limit entry to 9 digits
    if (disp.length > 9) {
      return
    }

    setCalculator({
      ...calculator,
      isSubmitted: false,
      isWaitingForSecondOperand: false,
      display: disp,
    })

  }

  //handle operator sign input
  const handleOperator = (op: string) => {
    const { isWaitingForSecondOperand, firstOperand, display, operator } = calculator

    if (isWaitingForSecondOperand) {
      if (operator !== op) {
        setCalculator({
          ...calculator,
          operator: op
        })
      }

    } else {
      let disp = display
      if (!firstOperand) {
        setCalculator({
          ...calculator,
          firstOperand: Number(disp),
          operator: op,
          isWaitingForSecondOperand: true,
          display: disp,
          isSubmitted: false,

        })
      } else {
        let response = performCalculation(operator, +firstOperand, Number(disp))
        setCalculator({
          ...calculator,
          firstOperand: +response!,
          display: response + '',
          isWaitingForSecondOperand: true,
          operator: op,
          isSubmitted: false,
        })
      }
    }
  }

  //handle del button click
  const handleDelClick = () => {
    const { display } = calculator

    let length = display.length
    if (length < 2) {
      setCalculator({
        ...calculator,
        display: "0"
      })
    } else {
      let preview = display.toString().split('').slice(0, length - 1).join('')
      setCalculator({
        ...calculator,
        display: preview ? preview : '0'
      })
    }
  }


  //handle submit button click
  const handleSubmit = () => {
    const { firstOperand, display, operator } = calculator

    // submit only if first operand exits or no operand
    if (firstOperand === false || !operator) {
      return
    }

    let disp = display
    let response: any

    response = performCalculation(operator, +firstOperand, Number(disp))

    setCalculator({
      ...calculator,
      display: response,
      isSubmitted: true,
      isWaitingForSecondOperand: false,
      firstOperand: false
    })

  }


  //handle set dot
  const setDot = () => {
    const { display, isWaitingForSecondOperand, isSubmitted } = calculator
    // waiting for second operand first digit according to either equal button is clicked or not
    if (isWaitingForSecondOperand) {
      setCalculator({
        ...calculator,
        display: isSubmitted ? display + '' : '0.',
        isSubmitted: false,
        isWaitingForSecondOperand: false
      })
      return
    }

    let screen = display + ''
    console.log(screen);

    // for any entry append only if no dot
    if (screen.indexOf('.') === -1 && screen.length < 9) {

      setCalculator({
        ...calculator,
        display: screen + '.',
        // isSubmitted: false,
        // firstOperand: false
      })
    }
  }

  //handle input
  const handleButtonClick = (inputValue: string | number) => {
    switch (inputValue) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9: handleDigitInput(inputValue); break;
      case '.': setDot(); break;
      case '+':
      case '-':
      case 'x':
      case '/': handleOperator(inputValue); break;
      case 'DEL': handleDelClick(); break;
      case 'RESET': handleResetClick(); break;
      case '=': handleSubmit(); break;
      default: break;
    }

  }

  //set the display
  const { display } = calculator
  let screenValue = Number(display).toLocaleString()

  return (
    <div data-theme={theme} className="app-wrapper">
      <article className='app'>
        <Header toggleSwitch={setTheme} />
        <main>
          <Screen display={screenValue} />
          <Keypad handleButtonClick={handleButtonClick} />
        </main>
      </article>
    </div>
  );
}

export default App;
