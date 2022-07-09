import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
    return (
        <div className='w-25'><Doughnut type='doughnut' data={chartData} /></div>
    )
}

export default PieChart