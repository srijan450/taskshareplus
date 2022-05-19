import React, { useContext } from 'react'
import { Popups } from '../../Context';

const api = () => {
    const { setMODAL, setLOADER } = useContext(Popups);

    const getTaskApi = async (uri, loader = false) => {
        setLOADER(loader);
        try {
            const req = await fetch(`https://best-task-app.herokuapp.com/${uri}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include'
            });
            const sdata = await req.json();
            setLOADER(false);
            return sdata;
        }
        catch (e) {
            console.log(e);
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
        setLOADER(false);
    }

    const postApi = async (uri, loader = false, data) => {
        setLOADER(loader);
        try {
            const req = await fetch(`https://best-task-app.herokuapp.com/${uri}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include'
            });
            const sdata = await req.json();
            return sdata;
        }
        catch (e) {
            console.log(e);
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
        setLOADER(false);
    }

    const patchAPI = async (uri, loader = false, data) => {
        setLOADER(loader);
        try {
            const req = await fetch(`https://best-task-app.herokuapp.com/${uri}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const sdata = await req.json();
            return sdata;
        }
        catch (e) {
            console.log(e);
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
        setLOADER(false);
    }
    return { getTaskApi, postApi, patchAPI }
}



export default api
