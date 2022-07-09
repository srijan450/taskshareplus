import React, { useEffect } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const Paginate = ({ nextHandler, previousHandler }) => {

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <button className='btn viewTaskHover border-1 border-info' onClick={previousHandler}><KeyboardDoubleArrowLeftIcon /></button>
                    </li>
                    <li class="page-item">
                        <button className='btn viewTaskHover border-1 border-info' onClick={nextHandler}><KeyboardDoubleArrowRightIcon /></button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Paginate