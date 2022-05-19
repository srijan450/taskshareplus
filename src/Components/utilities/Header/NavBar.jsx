import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Popups, UserContext } from '../../../Context';



const NavBar = () => {
    const { USER, setUSER } = useContext(UserContext);
    const { setLOADER, setMODAL } = useContext(Popups)

    const logout = async () => {
        setLOADER(true);
        try {
            const res = await fetch("http://localhost:5000/sign-out", { credentials: 'include' });
            const { error, success } = await res.json();
            if (success) {
                setUSER(null);
            }
        } catch (e) {
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
        setLOADER(false);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-0">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="./images/header.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                    &nbsp;Task App
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        <a className="nav-link" href="#">Features</a>
                        {
                            USER ? <>
                                <Link className="nav-link" to='/create-new-task'>Create Task</Link>
                                <Link to='/main-menu' className='nav-link'>main menu</Link>
                                <Link to="/" className='nav-link' onClick={logout}>Sign Out</Link>
                            </> : <>
                                <Link className="nav-link" to='/sign-in'>Sign In</Link>
                                <Link className="nav-link" to='/sign-up'>Sign Up</Link>


                            </>
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar