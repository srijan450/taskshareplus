import React, { useContext, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import './ViewTaskOptions.css';
import { Link, Navigate } from 'react-router-dom';
import { Popups } from '../../../Context';
import useApi from '../../API/api';
import { useEffect } from 'react';

const ViewTaskOptions = ({ id, completed }) => {

    const { markAsComplete, markAsIncomplete, deleteTaskHandler } = useApi();
    const handler = () => {
        window.$('.showsetting').toggle(500);
    }
    const [redirect, setredirect] = useState(false)
    const [complete, setcomplete] = useState(completed);

    useEffect(() => {

    }, [completed])




    if (redirect)
        return <Navigate to="/all-tasks" />
    return (
        <div>
            <button className='btn border' onClick={handler}><div className='openSetting'><SettingsIcon /></div></button>
            <div className='setting shadow px-5 py-4 showsetting'>

                {complete ? <button className="btn markAsConpleted border border-2 me-2 viewTaskHover" onClick={() => markAsIncomplete(id, setcomplete)} title='Mark As Incomplete'><AssignmentLateIcon /></button> : ''}

                {!complete ? <><button onClick={() => markAsComplete(id, setcomplete)} className="btn markAsConpleted border border-2 me-2 text-success" title='Mark As Complete'><AssignmentTurnedInIcon /></button><Link to={`/edit-task/${id}`} className='btn border border-2 me-2 text-warning editHover' title='Edit Task'><EditIcon /></Link> </> : ''}

                <button className='btn border border-2 me-2 text-danger deleteHover' title='Delete Task' onClick={() => deleteTaskHandler(id, setredirect)}><DeleteIcon /></button>
            </div>
        </div>
    )
}

export default ViewTaskOptions