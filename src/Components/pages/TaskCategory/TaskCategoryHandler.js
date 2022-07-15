import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../API/api';

const TaskCategoryHandler = () => {
    const [tasks, settasks] = useState(null);
    const [skip, setskip] = useState(0)
    const { getTaskApi, markAsComplete, deleteTaskHandler } = api();

    const verifyTaskCategoryAndRespond = async (name) => {
        if (name === 'your-tasks') {
            const res = await getTaskApi(`task?limit=10&sortby=updatedAt:desc&skip=${skip}`, true)
            const { error, task, user } = res;
            console.log(error);
            if (task) {
                settasks(task);
            }
        }
        else if (name === 'completed-tasks') {
            const res = await getTaskApi(`task?completed=true&limit=10&sortby=updatedAt:desc&skip=${skip}`, true)
            const { error, task, user } = res;
            if (task) {
                settasks(task);
            }
        } else if (name === 'pending-tasks') {
            const res = await getTaskApi(`task?completed=false&pending=true&limit=10&sortby=updatedAt:desc&skip=${skip}`, true)
            const { error, task, user } = res;
            if (task) {
                settasks(task);
            }

        } else if (name === 'shared-tasks') {
            const res = await getTaskApi(`shared-task?limit=10&sortBy=desc&skip=${skip}`, true)
            const { error, task, user } = res;
            if (task) {
                settasks(task);
            }
        } else if (name === 'completed-shared-tasks') {
            const res = await getTaskApi(`shared-task?completed=true&limit=10&sortBy=desc&skip=${skip}`, true)
            const { error, task, user } = res;
            if (task) {
                settasks(task);
            }
        } else if (name === 'pending-shared-tasks') {
            const res = await getTaskApi(`shared-task?completed=false&pending=true&limit=10&sortBy=desc&skip=${skip}`, true)
            const { error, task, user } = res;
            if (task) {
                settasks(task);
            }
        } else {
            console.log("hello world");
            return true;
        }
        // hide loader
        return false;
    }

    const previousHandler = (e) => {
        if (skip > 0)
            setskip(skip - 3);
    }

    const nextHandler = (e) => {
        if (tasks.length > 3)
            setskip(skip + 3);
    }

    const removeCompletedTask = async (id, name, ind) => {
        await markAsComplete(id, () => { settasks(tasks.filter((item, inD) => inD !== ind)) });

        await verifyTaskCategoryAndRespond(name);

    }

    const deleteTask = async (id, name, ind) => {
        await deleteTaskHandler(id, () => { settasks(tasks.filter((item, inD) => inD !== ind)) });

        await verifyTaskCategoryAndRespond(name);
    }

    return { verifyTaskCategoryAndRespond, tasks, previousHandler, nextHandler, skip, removeCompletedTask, deleteTask }
}

export default TaskCategoryHandler