import React, { useEffect, useState } from 'react'
import TaskInfoAccordion from '../taskInfoComponent/TaskInfoAccordion'
import api from '../../API/api';

const TaskInfo = ({ action, notask }) => {
    const { getTaskApi } = api();
    const [tasks, settasks] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const seturi = { uri: '' }
            if (action === '')
                seturi.uri = 'task?limit=3&sortby=updatedAt:desc'
            else if (action === 'completed')
                seturi.uri = 'task?completed=true&limit=3&sortby=updatedAt:desc'
            else if (action === 'shared')
                seturi.uri = 'shared-task?limit=3&sortBy=desc'
            else if (action === 'pending')
                seturi.uri = 'task?limit=3&sortby=updatedAt:desc&pending=true'
            else if (action === 'pendingshared')
                seturi.uri = 'shared-task?limit=3&sortBy=desc&pending=true'
            else if (action === 'completedshared')
                seturi.uri = 'shared-task?limit=3&sortBy=desc&completed=true'
            const res = await getTaskApi(seturi.uri);
            const { error, task } = res;
            if (task)
                settasks(task);

        }
        fetchApi();
    }, [tasks])

    return (
        <>
            <div className="accordion" id="accordionExample">
                {tasks && tasks.map((data) => <>
                    <TaskInfoAccordion data={data} key={data._id} action={action} />
                </>)}
            </div>
            {tasks.length == 0 ? <div className='text-danger'>{notask}</div> : ''}
        </>
    )
}

export default TaskInfo