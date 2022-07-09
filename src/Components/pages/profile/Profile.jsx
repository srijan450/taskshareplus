import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../Context'
import PieChart from '../../utilities/pieChart/PieChart';

const Profile = () => {
    const { USER } = useContext(UserContext);
    
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
        USER && <div className='w-100 border' style={{ minHeight: '90vh' }}>

            <div className='col-8 border mx-auto my-5'>
                <table>
                    <tr>
                        <th className='col-2'>Name</th>
                        <td className='col-8'>{USER.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{USER.email}</td>

                    </tr>
                    <tr>
                        <th>username</th>
                        <td>{USER.username}</td>
                    </tr>
                    <tr>
                        <th>Friends</th>
                        <td>
                            {USER && USER.friends.map((item) => <td>{item.username},&nbsp;</td>)}
                        </td>
                    </tr>
                </table>
                <div>
                    <PieChart chartData={data} />
                </div>
            </div>
        </div>
    )
}

export default Profile