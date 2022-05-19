import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import './ViewTaskOptions.css';
import { Link } from 'react-router-dom';
const ViewTaskOptions = ({ id }) => {
    const handler = () => {
        window.$('.showsetting').toggle(500);
    }
    const editHandler = () => {

    }
    return (
        <div>
            <button className='btn border' onClick={handler}><div className='openSetting'><SettingsIcon /></div></button>
            <div className='setting shadow px-5 py-4 showsetting'>
                <Link to={`/view-task/${id}`} className="btn markAsConpleted border border-2 me-2 text-success" title='Mark As Complete'><AssignmentTurnedInIcon /></Link>

                <Link to={`/edit-task/${id}`} className='btn border border-2 me-2 text-warning editHover' title='Edit Task'><EditIcon /></Link>

                <Link to={`/edit-task/${id}`} className='btn border border-2 me-2 text-danger deleteHover' title='Delete Task'><DeleteIcon /></Link>
            </div>
        </div>
    )
}

export default ViewTaskOptions