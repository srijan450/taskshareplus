import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Button from '../../utilities/Navigation/Button';
import TaskInfo from '../../utilities/Tasks-info-deep/TaskInfo';
import TaskCategoryHandler from './TaskCategoryHandler';

const TaskCategory = () => {
    const { name } = useParams("name");
    const { verifyTaskCategoryAndRespond, tasks, settasks } = TaskCategoryHandler();
    const [redirect, setredirect] = useState(false)
    useEffect(() => {
        const doStuff = async () => {
            setredirect(await verifyTaskCategoryAndRespond(name.trim()));
        }
        doStuff();
    }, []);

    const setName = () => {
        switch (name) {
            case "completed-tasks":
                return "Completed Task";
            default: {

                return "Your Tasks"
            }
        }
    }
    if (redirect)
        return <Navigate to="/main-menu" />


    return (
        <div className='w-100 py-4' style={{ minHeight: '90vh' }}>

            <div className='row justify-content-between px-5' style={{ alignItems: 'center' }}>
                <div className='col-9 d-flex align-items-center'>
                    <Button side='back' classes='me-4' />
                    <h1 className=''>{setName()}</h1>
                </div>
                <form className='col-3'>
                    <input type="search" placeholder='search by task heading' className='form-control' />
                </form>
                <hr className='col-12 my-0 mx-2 text-danger ' />
            </div>

            <div className='row px-5 justify-content-between' style={{ maxHeight: "77vh", overflowY: 'auto', overflowX: 'hidden' }}>
                {tasks.map((items) => <TaskInfo data={items} />)}
            </div>
        </div>
    )
}

export default TaskCategory