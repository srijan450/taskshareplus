import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../../Context'
import TaskInfo from '../../utilities/taskInfo/TaskInfo';

const Menu = () => {
    const { USER } = useContext(UserContext);

    if (!USER)
        return <Navigate to='/sign-in' />

    return (
        <div className='w-100 border' style={{ minHeight: "90vh" }}>
            <div className='col-11 mx-auto'>
                <h2><Link to="/your-tasks" className='text-decoration-none text-dark hover'>Your Tasks</Link></h2>
                <TaskInfo action={''} />

                <h2><Link to="/completed-tasks" className='text-decoration-none text-dark hover'>Completed Tasks</Link></h2>
                <TaskInfo action={'completed'} />

                <h2><Link to="/shared-tasks" className='text-decoration-none text-dark hover'>Shared Tasks</Link></h2>
                <TaskInfo action={'shared'} />

                <h2>Completed Shared Tasks</h2>
                <TaskInfo action={'completedshared'} />

                <h2>Pending Task</h2>
                <TaskInfo action={'pending'} />

                <h2>Pending Shared Task</h2>
                <TaskInfo action={'pendingshared'} />
            </div>
        </div>
    )
}

export default Menu;