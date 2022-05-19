import React from 'react'
import { Link } from 'react-router-dom'
import Calander from '../DateAndTime/Calander'
import Timer from '../DateAndTime/Timer'
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import "./style.css"
const TaskInfo = ({ data: { _id, header, body, durationDate, durationTime, createdDate, taskIcon, completed } }) => {
    const allowedHeader = (str) => {
        if (str.length > 60)
            return `${str.substring(0, 60)}...`
        return str
    }
    return (
        <div className='py-2 px-4 border m-2'>
            <div className='row justify-content-between' style={{ alignItems: 'center' }} >
                <div className='row col-10 ' style={{ alignItems: 'center' }} >
                    <div className='img col-1'>
                        <img src={taskIcon !== "" ? `https://best-task-app.herokuapp.com/taskimage/${_id}` : "/images/no-image.jpg"} alt="" />
                    </div>
                    <h3 className='col-11 manageOverflow overflow-hidden'><Link to={`/view-task/${_id}`} className=' text-decoration-none text-dark'>{allowedHeader(header)}</Link></h3>
                </div>
                <div className='col-2 text-end'>
                    {durationDate || durationTime ? <Timer date={durationDate} time={durationTime} /> : ''}
                </div>
            </div>

            <div className='task-body my-2' dangerouslySetInnerHTML={{ __html: body }}></div>
            <div className='row justify-content-between mt-0' style={{ alignItems: 'end' }} >
                <div className='col-3 d-flex justify-content-start'>
                    <Link to={`/view-task/${_id}`} className="btn viewTaskHover me-3" title='View Task'><AssignmentIcon /></Link>

                    {!completed ? <><Link to={`/edit-task/${_id}`} className="btn markAsConpleted me-3" title='MArk As Completed Task'><AssignmentTurnedInIcon /></Link>
                        <Link to={`/edit-task/${_id}`} className="btn editHover me-3" title='Edit Task'><EditIcon /></Link></>
                        : ''}
                    <Link to={`/edit-task/${_id}`} className="btn deleteHover" title='Delete Task'><DeleteIcon /></Link>
                </div>
                <div className='col-2 text-end'>
                    <Calander date={createdDate} text="created date" />
                </div>

            </div>
        </div>
    )
}

export default TaskInfo