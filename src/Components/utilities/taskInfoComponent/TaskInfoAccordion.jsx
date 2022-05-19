import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../API/api'
import DateAndTime from '../DateAndTime/DateAndTime';

const TasckInfoAccordion = ({ data: { header, body, durationDate, createdDate, durationTime, _id, completed }, action }) => {
    const { getTaskApi } = api();
    const markAsCompleted = async () => {
        await getTaskApi(`task/mark-as/${_id}?completed=true`);
    }

    return (

        <div class="accordion-item">
            <h2 class="accordion-header" id={`ab${_id}`}>
                <button class="accordion-button collapsed py-1" type="button" data-bs-toggle="collapse" data-bs-target={`#qw${_id}`} aria-expanded="false" aria-controls={`qw${_id}`}>
                    <div className='row align-items-center w-100'>
                        <h3 className=' col-7' style={{ wordBreak: 'break-all', height: "35px" }}>{header}</h3>
                        <div className='col-5 text-end px-3'>
                            {!completed && <DateAndTime durationDate={durationDate} createdDate={createdDate} durationTime={durationTime} _id={_id} />}
                        </div>
                    </div>
                </button>
            </h2>
            <div id={`qw${_id}`} className="accordion-collapse collapse" aria-labelledby={`#ab${_id}`}>
                <div className="accordion-body pb-2" dangerouslySetInnerHTML={{ __html: body }} style={{ maxHeight: "80px", overflow: "hidden" }}></div>
                <div className='mt-0 text-end px-4 py-2'>
                    {action !== 'completed' ? <span className='nav-link d-inline' style={{ cursor: "pointer" }} onClick={markAsCompleted}>mark as completed</span> : ''}
                    <Link to={`/view-task/${_id}`} className='nav-link d-inline'>Go to this task</Link>
                </div>
            </div>
        </div>
    )
}

export default TasckInfoAccordion