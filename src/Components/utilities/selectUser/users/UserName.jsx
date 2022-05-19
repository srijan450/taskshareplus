import React, { createContext, useContext, useEffect, useState } from 'react'
import { CreateTaskContext } from '../../../../Context';
import api from "../../../API/api";

const UserName = ({ username, send, setsend, sendHandler }) => {

    const { user, sharewith, setsharewith, friends, setfriends, users } = useContext(CreateTaskContext)


    useEffect(() => {
        if (friends.includes(username)) {
            setsend("remove")
        } else {
            setsend("select")
        }
    }, [[], user, friends, users])


    return (
        <div className='d-flex align-items-center justify-content-between border px-2 py-2'>
            <div className="d-flex align-items-center">
                <div className='usericon'>
                    <img src="./images/nouserimage.webp" alt="cannot display image" title='user image' />
                </div>
                <h6 className='mx-2 text-uppercase py-0'>{username}</h6>
            </div>

            <div className="">
                <button className={`btn py-0 me-2 pb-1 btn-${send === 'select' ? 'primary' : 'secondary'} `} onClick={() => sendHandler(username)}>{send}</button>
            </div>
        </div>
    )
}

export default UserName