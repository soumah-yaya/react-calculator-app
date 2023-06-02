
import {KeyButton} from '../'

import './keypad.css'

type KeyPadType = {
    handleButtonClick:(txt:string | number)=>void    
}


const Keypad = ({ handleButtonClick }: KeyPadType) => {
    
  return (
    <section className='keypad'>
        <KeyButton text={7} click={handleButtonClick} />
        <KeyButton text={8} click={handleButtonClick} />
        <KeyButton text={9} click={handleButtonClick} />
        <KeyButton text='DEL' click={handleButtonClick} isDelKey={true} />

        <KeyButton text={4} click={handleButtonClick} />
        <KeyButton text={5} click={handleButtonClick} />
        <KeyButton text={6} click={handleButtonClick} />
        <KeyButton text='+' click={handleButtonClick} />

        <KeyButton text={1} click={handleButtonClick} />
        <KeyButton text={2} click={handleButtonClick} />
        <KeyButton text={3} click={handleButtonClick} />
        <KeyButton text='-' click={handleButtonClick} />

        <KeyButton text='.' click={handleButtonClick} />
        <KeyButton text={0} click={handleButtonClick} />
        <KeyButton text='/' click={handleButtonClick} />
        <KeyButton text='x' click={handleButtonClick} />

        <KeyButton text='RESET' click={handleButtonClick} isDelKey={true} />
        <KeyButton text='=' click={handleButtonClick} isEqualKey={true} />
        
    </section>
  )
}

export default Keypad