import React, { useEffect, useState } from 'react'
import TaskInfoAccordion from '../taskInfoComponent/TaskInfoAccordion'
import api from '../../API/api';

const TaskInfo = ({ action }) => {
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
                seturi.uri = 'task?limit=3&sortby=updatedAt:desc&shared=true'
            else if (action === 'pending')
                seturi.uri = 'task?limit=3&sortby=updatedAt:desc&pending=true'
            else if (action === 'pendingshared')
                seturi.uri = 'task?limit=3&sortby=updatedAt:desc&pending=true&shared=true'
            else if (action === 'completedshared')
                seturi.uri = 'task?completed=true&limit=3&sortby=updatedAt:desc&shared=true'
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
            {tasks.length == 0 ? <div>Create Your Tasks to display here</div> : ''}
        </>
    )
}

export default TaskInfo