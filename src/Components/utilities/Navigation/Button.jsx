import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
// import {  } from 'react-router-dom';
const Button = ({ side, classes }) => {
    // const history = useHistory();
    const handler = () => {
        if (side === 'back') {
            window.history.back();
        } else {
            window.history.forward();
        }
    }
    return (
        <button className={`backbtn ${classes}`} onClick={handler}>
            {side === 'back' ? <ChevronLeftIcon /> : <ChevronRightTwoToneIcon />}
        </button>
    )
}

export default Button