import React, { useState } from 'react';
import './App.css';
import { Header, Keypad, Screen } from './components';
import { retrieveData, performCalculation } from './utils';

type AppType = {
  firstOperand: string | boolean,
  isWaitingForSecondOperand: boolean,
  operator: string,
  display: string,
  isSubmitted: boolean,
  lastKey: string | boolean,
  modeValue: string | boolean
}


function App() {

  const [theme, setTheme] = useState(retrieveData('theme', 'theme1'))

  const [calculator, setCalculator] = useState<AppType>({
    isWaitingForSecondOperand: false,
    firstOperand: false,
    operator: '',
    display: '0',
    isSubmitted: false,
    lastKey: false,
    modeValue: false
  })

  // reset all 
  const handleResetButton = () => (
    setCalculator({
      ...calculator,
      isWaitingForSecondOperand: false,
      firstOperand: false,
      operator: '',
      display: '0',
      isSubmitted: false,
      lastKey: false,
      modeValue: false
    })
  )

  //handle numeric input
  const handleDigitButtons = (digit: string) => {

    const { display, lastKey } = calculator
    let disp = (display === '0'
      || lastKey === 'operator'
      || lastKey === 'equal') ? digit : display + digit

    // limit entry to 9 digits
    if (disp.length > 9) {
      return
    }

    setCalculator({
      ...calculator,
      display: disp,
      lastKey: 'number'
    })

  }

  //handle operator sign input
  const handleOperatorButtons = (op: string) => {
    const { operator, display, lastKey, firstOperand } = calculator

    if (firstOperand !== false && operator && lastKey !== 'operator' && lastKey !== 'equal') {
      let response = performCalculation(operator, firstOperand, display)
      setCalculator({
        ...calculator,
        firstOperand: response,
        display: response,
        lastKey: 'operator',
        operator: op
      })
    } else {
      setCalculator({
        ...calculator,
        firstOperand: display,
        lastKey: 'operator',
        operator: op
      })
    }

  }

  //handle del button click
  const handleDelButton = () => {
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
  const handleEqualButton = () => {

    const { operator, display, lastKey, firstOperand, modeValue } = calculator
    if (firstOperand !== false) {
      let response = performCalculation(operator, firstOperand, display)
      setCalculator({
        ...calculator,
        firstOperand: false,
        display: response,
        modeValue: display,
        lastKey: 'equal',
      })

    } else {
      if (lastKey === 'equal') {
        let response = performCalculation(operator, display, modeValue)
        setCalculator({
          ...calculator,
          display: response,
          firstOperand: false,
          lastKey: 'equal',
        })
      }
    }

  }


  //handle set dot
  const handleDotButton = () => {
    const { display, lastKey } = calculator
    
    if (lastKey === 'operator' || lastKey === 'equal') {
      setCalculator({
        ...calculator,
        display: '0.',
        lastKey: 'dot'
      })
    } else if (!display.includes('.')) {
      setCalculator({
        ...calculator,
        display: display + '.',
        lastKey: 'dot'
      })

    } 
  }

  //handle input
  const handleButtonClick = (input: string) => {
    if (input === '=') { handleEqualButton() }
    else if (input === '.') { handleDotButton() }
    else if (input === '+' || input === '-' || input === 'x' || input === '/') { handleOperatorButtons(input) }
    else if (input === 'DEL') { handleDelButton() }
    else if (input === 'RESET') { handleResetButton() }
    else { handleDigitButtons(input) }

  }

  //set the display
  const { display } = calculator

  return (
    <div data-theme={theme} className="app-wrapper light dark">
      <article className='app'>
        <Header toggleSwitch={setTheme} />
        <main>
          <Screen display={display.toLocaleString()} />
          <Keypad handleButtonClick={handleButtonClick} />
        </main>
      </article>
    </div>
  );
}

export default App;
