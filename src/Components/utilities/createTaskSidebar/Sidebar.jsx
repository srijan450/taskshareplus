import Input from "../Input/Input.jsx"
import React, { useContext, useState } from 'react'
import sidebarHandler from './sidebarHandler'
import SearchIcon from '@mui/icons-material/Search';
import "./sidebar.css"
import SelectContainer from "../selectUser/SelectContainer.jsx";
import { CreateTaskContext } from "../../../Context.js";
const Sidebar = () => {
    const { usernameHandler } = sidebarHandler();
    const { user, showFriends, cancleButtonHandler } = useContext(CreateTaskContext);


    return (
        <div className='col-3 shadow'>
            <div className='px-2 py-4'>
                <h5 className='text-center text-uppercase mb-1'>Share with</h5>
                <hr className='mt-0' />
                <div>
                    <div className="d-flex">
                        <label htmlFor="searchUser" className="setIconInput "><SearchIcon /></label>
                        <input class="form-control form-control-sm ps-4 me-1" type="search" placeholder="search friends by username" id="searchUser" title="search by username" onChange={usernameHandler} value={user} />
                        <button className="btn btn-light" onClick={cancleButtonHandler}>clear</button>
                    </div>

                    {!showFriends ? <SelectContainer user={user} /> : <SelectContainer user={''} showFriends={showFriends} />}
                </div>
            </div>
        </div >
    )
}

export default Sidebar