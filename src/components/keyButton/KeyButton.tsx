import React from 'react'

import './keybutton.css'

type KeyButtonType = {
    text: string | number;
    click:(txt:string|number)=>void;
    isDelKey?:boolean;
    isEqualKey?:boolean;
}
const KeyButton = ({ text, click, isDelKey, isEqualKey }: KeyButtonType) => {
    let classname = 'keybutton'
    if(isDelKey && typeof text === 'string' && text.toLocaleLowerCase() === 'del') {
        classname = classname + ' del'
    }
    if(isDelKey && typeof text === 'string' && text.toLocaleLowerCase() === 'reset') {
        classname = classname + ' del reset'
    }
    if(isEqualKey) {
        classname = classname + ' equal'
    }

    if(isDelKey && isEqualKey) {
        classname = 'keybutton'
    }
    return (
        <button onClick={()=>click(text)} className={classname}>{text}</button>
    )
}

export default KeyButton