import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../Context'
import Button from '../../utilities/Navigation/Button';
import PieChart from '../../utilities/pieChart/PieChart';

const Profile = () => {
    const { USER } = useContext(UserContext);

    return (
        USER && <div className='w-100 border' style={{ minHeight: '90vh' }}>


            <div className='col-8 border mx-auto my-5 px-5 py-4'>
                <div className='row justify-content-between mb-4' style={{ alignItems: 'center' }}>
                    <div className='col-9 d-flex align-items-center'>
                        <Button side='back' classes='me-4' />
                        <h3 className=''>Profile</h3>
                    </div>
                    <hr className='col-12 my-1 mx-auto text-danger ' />
                </div>
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
                <div className='my-3'>
                    <PieChart />
                </div>
            </div>
        </div>
    )
}

export default Profile