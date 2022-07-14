import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LogarithmicScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import api from '../../API/api';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [show, setshow] = useState(false);
    const [Data, setData] = useState(null);
    const { getTaskApi } = api();
    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getTaskApi("tasks-count-category-wise");
            if (data.yourTasks === 0 && data.completedTasks === 0 && data.pendingTasks === 0 && data.sharedTasks === 0 && data.completedSharedTasks === 0 && data.pendingSharedTasks === 0)
                setshow(false)
            else
                setshow(true)
            setData({
                labels: [
                    `Your Tasks`,
                    'Your Completed Tasks',
                    'Your Pending Taks',
                    'Shared Tasks',
                    'Completed Shared Tasks',
                    'Pending Shared Tasks'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [data.yourTasks, data.completedTasks, data.pendingTasks, data.sharedTasks, data.completedSharedTasks, data.pendingSharedTasks],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(255, 120, 86)',
                        'rgb(255, 205, 150)',
                        'rgb(0, 205, 86)'

                    ],
                    hoverOffset: 4
                }]
            })
        }
        fetchAPI();
    }, [Data]);


    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };


    return (
        (show && Data) && <>
            <h3 className='fw-bolder text-center'>Actitity</h3>
            <div className='w-50 mx-auto border my-0 py-0 ps-2'><Doughnut type='doughnut' data={Data} options={{ plugins: { legend: { position: 'right', labels: { usePointStyle: true } } } }} plugins={[{}]} /></div>
        </>
    )
}

export default PieChart