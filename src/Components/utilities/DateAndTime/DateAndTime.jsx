import React from 'react'
import Calander from './Calander'
import Clock from './Clock'

const DateAndTime = ({ durationTime, durationDate, createdDate, _id }) => {
    return (
        <div className='row justify-content-end'>

            {createdDate ? <>
                <span className='col-4'>
                    <Calander date={createdDate} text="Start Date" />
                </span>
            </> : ''
            }

            {durationDate ? <>
                <span className='col-4'>
                    <Calander date={durationDate} text="End Date" />
                </span>
            </> : " "
            }

            {durationDate || durationTime ? <>
                <span className='col-4'>
                    <Clock date={durationDate} time={durationTime} _id={_id} createdDate={createdDate} />
                </span>
            </> : ""}
        </div>
    )
}

export default DateAndTime