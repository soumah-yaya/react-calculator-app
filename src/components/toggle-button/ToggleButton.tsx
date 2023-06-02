import {useRef} from 'react'
import './toggle-button.css'
import { saveData } from '../../utils'

export type ToggleButtonType = {
    toggleSwitch: React.Dispatch<React.SetStateAction<string>>
}

const ToggleButton = ({ toggleSwitch }: ToggleButtonType) => {
    const toggleRef = useRef<HTMLDivElement>(null!)
    const handleToggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const MouseX = event.pageX
        let toggleOffsetX = toggleRef.current?.offsetLeft
        let deltaX = Math.abs(toggleOffsetX - MouseX)
        
        if (deltaX < 22) {
            toggleSwitch('theme1')
            saveData('theme', 'theme1')
        } else if (deltaX < 40) {
            toggleSwitch('theme2')
            saveData('theme', 'theme2')
        } else {
            toggleSwitch('theme3')
            saveData('theme', 'theme3')
        }

    }
    return (
        <div className='toggle-wrapper'>
            <div className="toggle-number">
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </div>
            <div ref={toggleRef} onClick={handleToggleClick} role="switch" aria-checked={false} aria-label='switch theme' className="toggle-radio-track">
                <div className="toggle-radio-handle"></div>
            </div>
        </div>
    )
}

export default ToggleButton