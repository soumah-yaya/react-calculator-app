import React from 'react'

import './screen.css'

const Screen = ({ display }: { display:string}) => {
  
  return (
    <div className='screen'>
      <span>{display}</span>
    </div>
  )
}

export default Screen