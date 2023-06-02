import React from 'react'
import { ToggleButtonType } from '../toggle-button/ToggleButton'
import './header.css'
import {ToggleButton} from '../'
const Header = ({ toggleSwitch }: ToggleButtonType) => {
  return (
    <header className='header'>
        <div className="title">
            <h1>calc</h1>
        </div>
        <div className="theme">
            <span>THEME</span>
              <ToggleButton toggleSwitch={toggleSwitch} />
        </div>
    </header>
  )
}

export default Header