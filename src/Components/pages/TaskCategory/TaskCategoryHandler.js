import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../API/api';

const TaskCategoryHandler = () => {
    const [tasks, settasks] = useState([]);
    const { getTaskApi } = api();
    const verifyTaskCategoryAndRespond = async (name) => {
        if (name === 'your-tasks') {
            const res = await getTaskApi("task?limit=10&sortby=updatedAt:desc", true)
            const { error, task, user } = res;
            console.log(error);
            if (task) {
                settasks(task);
                console.log(user);
            }
        }
        else if (name === 'completed-tasks') {
            const res = await getTaskApi("task?completed=true&limit=3&sortby=updatedAt:desc", true)
            const { error, task, user } = res;
            if (task) {
                settasks(task);
                console.log(user);
            }
        } else if (name === 'pending-tasks') {

        } else if (name === 'shared-tasks') {

        } else if (name === 'completed-shared-tasks') {

        } else if (name === 'pending-shared-tasks') {

        } else {
            console.log("hello world");
            return true;
        }
        // hide loader
        return false;
    }

    return { verifyTaskCategoryAndRespond, tasks, settasks }
}

export default TaskCategoryHandler