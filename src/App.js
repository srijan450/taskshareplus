import React, { useEffect, useState } from 'react'
import Signin from './Components/pages/auth/Signin'
import Signup from './Components/pages/auth/Signup'
import NavBar from './Components/utilities/Header/NavBar'
import { Route, Routes } from "react-router-dom";
import Modal from './Components/utilities/modals/Modal';
import Loader from './Components/utilities/modals/Loader';
import { Popups, UserContext } from "./Context";
import Menu from './Components/pages/mainMenu/Menu';
import ForgotPassword from './Components/pages/auth/ForgotPassword';
import CreateTask from "../src/Components/pages/createTask/CreateTask"
import TaskCategory from './Components/pages/TaskCategory/TaskCategory';
import TaskView from './Components/pages/ViewTask/TaskView';
import Error404V from './Components/pages/404Error/Error404V';
import EditTask from './Components/pages/editTask/EditTask.jsx';

const App = () => {
    const [USER, setUSER] = useState(null);
    const [LOADER, setLOADER] = useState(false);
    const [MODAL, setMODAL] = useState({ show: false, header: "", body: "", success: false });

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await fetch("https://best-task-app.herokuapp.com/validate-user", { credentials: 'include' });
                const { user } = await res.json();
                if (user) {
                    setUSER(user);
                }
            } catch (e) {
                console.log(e);
                setMODAL({
                    show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false
                });
            }
        }
        fetchApi();
    }, [USER]);


    return (
        <>
            <Popups.Provider value={{ setLOADER, setMODAL }}>
                <UserContext.Provider value={{ USER, setUSER }}>
                    <NavBar />
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh', alignItems: "center", justifyContent: "center", border: "1px solid" }}>
                        <Routes>
                            <Route exact path='/sign-up' element={<Signup />} />
                            <Route exact path='/sign-in' element={<Signin />} />
                            <Route exact path='/forgot-password' element={<ForgotPassword />} />
                            <Route exact path='/main-menu' element={<Menu />} />
                            <Route exact path='/create-new-task' element={<CreateTask />} />
                            <Route exact path='/:name' element={<TaskCategory />} />
                            <Route exact path='/view-task/:id' element={<TaskView />} />
                            <Route exact path='/error-page' element={<Error404V />} />
                            <Route exact path='/edit-task/:id' element={<EditTask />} />
                        </Routes>
                    </div>
                </UserContext.Provider>
            </Popups.Provider>
            <Loader show={LOADER} />
            <Modal data={MODAL} modalHandler={setMODAL} />
        </>
    )
}

export default App