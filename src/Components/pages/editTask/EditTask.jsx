import React, { useContext, useEffect, useState } from 'react';
import Axios from "axios"
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TitleIcon from '@mui/icons-material/Title';
import "./editTask.css";
import Editor from '../../utilities/editor/Editor.jsx';
import { CreateTaskContext, Popups, UserContext } from '../../../Context';
import { Navigate, useParams } from 'react-router-dom';
import Sidebar from '../../utilities/createTaskSidebar/Sidebar';
import api from '../../API/api';
import Button from '../../utilities/Navigation/Button';

const EditTask = () => {
    const [quill, setquill] = useState(null) // editor
    const [fdata, setfdata] = useState(null); // fdata
    const { setLOADER, setMODAL } = useContext(Popups); // modal and loader
    const { USER } = useContext(UserContext); // for authentication
    const [user, setuser] = useState("")//input box 
    const [users, setusers] = useState([]);// to store data from search API
    const [sharewith, setsharewith] = useState([]); // for selected users defaults friends 
    const [showFriends, setshowFriends] = useState(false) // show sidebar 2nd container
    const [friends, setfriends] = useState([]); // show previous friends
    const { getTaskApi } = api()

    const { id } = useParams("id");

    useEffect(() => {
        const fetchTask = async () => {
            const { error, task } = await getTaskApi(`task/${id}`, true);
            if (error) {

            } else {
                if (task.durationDate)
                    task.durationDate = task.durationDate.substr(0, 10);
                delete task.createdDate;
                delete task.completed;
                delete task.pending;
                delete task.owner;
                delete task.createdAt;
                delete task.updatedAt;
                setfdata(task);
            }
        }
        fetchTask();
    }, [])


    const handler = (e) => {
        const { name, value, files } = e.target;
        if (name === "taskIcon") {
            const type = files[0].type;
            if (type === "image/jpg" || type === "image/png" || type === "image/jepg") {
                setfdata({ ...fdata, [name]: files[0] })
                const [file] = files;
                document.getElementById("iconImage").src = URL.createObjectURL(file);
            } else {
                setMODAL({ show: true, header: <><span className="text-danger">Task Icon should be image</span></>, body: <><span className="text-dark">Task Icon should be of image (.png, .jpeg, .jpg) format.</span></>, success: false });
            }
        }
        else {
            if (name === 'header' && value.trim() === '')
                setBorder(e.target)
            else if (name === "durationDate" && new Date(value) < new Date()) {
                setMODAL({ show: true, header: <>Date Error</>, body: <><span className="text-danger">Please select future date!</span></>, success: false });
                return;
            }
            else if (name === "durationTime" && !fdata.durationDate && (new Date().setHours(parseInt(value.split(":")[0]), parseInt(value.split(":")[1])) - new Date().getTime()) < 0) {
                setMODAL({ show: true, header: <>Time Error</>, body: <><span className="text-danger">Please select future time!</span></>, success: false });
                return;
            }

            setfdata({ ...fdata, [name]: value })
        }
    }

    const setBorder = (e, val = false, reset = false) => {
        if (val) {
            e.style.borderColor = "#28a745";
            e.style.boxShadow = "0 0 0 0.2rem rgba(40, 167, 69, 0.25)";
        } else {
            e.style.borderColor = "#28a745";
            e.style.boxShadow = "0 0 0 0.2rem rgba(167, 40, 40, 0.25)";
        }
    }

    const editHandler = async (e) => {
        e.preventDefault();
        if (fdata.shared && friends.length == 0) {
            setMODAL({ show: true, header: <></>, body: <><span className="text-dark">Please select users with whoom you want to share this task.</span></>, success: false });
            return;
        }
        if (fdata.header.trim()) {
            setLOADER(true);
            const formData = new FormData();
            formData.append('header', fdata.header);
            formData.append('body', fdata.body);
            formData.append('durationDate', fdata.durationDate == null ? "" : fdata.durationDate);
            formData.append('durationTime', fdata.durationTime);
            formData.append('taskIcon', fdata.taskIcon);
            formData.append('shared', fdata.shared);
            if (fdata.shared) {
                formData.append('sharewith', friends);
            }

            var object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            console.log(object);

            try {
                console.log(fdata._id);
                const url = "http://localhost:5000/task/" + id;
                const res = await Axios.patch(url, formData, {
                    withCredentials: true
                });

                const { data: { error, task } } = res;
                console.log(res);
                if (error) {
                    console.log(error);
                } else {
                    const { _id, shared } = task;
                    quill.root.innerHTML = "";
                    e.target.header.style.borderColor = "#86b7fe";
                    e.target.header.style.boxShadow = "0 0 0 .25rem rgba(13,110,253,.25)";
                }

            }
            catch (e) {
                console.log(e);
                setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
            }
        }
        else {
            setMODAL({ show: true, header: <><span className="text-danger">Task title is required!</span></>, body: <><span className="text-dark">Task Title must be be provided.</span></>, success: false });
        }
        setLOADER(false);
    }

    const cancleButtonHandler = () => {
        setuser("");
        setBorder(document.getElementById("searchUser"), false, true);
        setshowFriends(true);
    }

    // if (!USER)
    //     return <Navigate to='/sign-in' />

    return (
        <>
            {fdata &&
                <div className='row w-100 justify-content-center'>
                    <div className='col-7 py-4 shadow'>
                        <div className='container'>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <Button side='back' classes='me-4' />
                                    <label htmlFor="image">
                                        <div className='img'>
                                            <img src={fdata.taskIcon !== "" ? `http://localhost:5000/taskimage/${fdata._id}` : "/images/no-image.jpg"} id="iconImage" alt="cannot display image" title='task icon' />
                                        </div>
                                        <input type="file" id="image" name="taskIcon" className='d-none' accept=".png, .jpg, .jpeg" onChange={handler} value={fdata.iconImage} form="updateTaskform" />
                                    </label>
                                    <h2 className='mx-3 text-uppercase'>Edit task</h2>
                                </div>
                                <div>
                                    <input type="date"
                                        form='updateTaskform' name="durationDate" title='select end date' onChange={handler} value={fdata.durationDate} /><input type="time" name="durationTime" onChange={handler} value={fdata.durationTime} title='select end time' form='updateTaskform' />
                                </div>
                            </div>
                            <hr className='my-1' />
                        </div>

                        <form className='px-3 py-4' id="updateTaskform" onSubmit={editHandler} encType="multipart/form-data" method='POST'>

                            <div className="mb-3">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><TitleIcon /> </span>
                                    <input type="text" name='header' value={fdata.header} onChange={handler} className="form-control" placeholder="title for task..." aria-label="header" aria-describedby="basic-addon1" title='title for task' required />
                                </div>
                            </div>

                            <div className="input-group">
                                <span className="input-group-text" style={{ height: "42px" }}> <DescriptionOutlinedIcon /></span>
                                <Editor quill={quill} setquill={setquill} setfdata={setfdata} fdata={fdata} />
                            </div>

                            <div className='row px-2'>
                                {/* <button className='btn btn-danger me-2' onClick={() => setfdata({ ...fdata, shared: !fdata.shared })} >Shared</button> */}
                                <div className='my-2 d-flex justify-content-end'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="shared" checked={fdata.shared} defaultValue onChange={(e) => setfdata({ ...fdata, shared: e.target.checked })} id="flexCheckDefault" />
                                        <label className="form-check-label text-uppercase" htmlFor="flexCheckDefault">
                                            Shared
                                        </label>
                                    </div>

                                </div>
                                <button className='btn btn-warning' disabled={(!fdata.header.trim() && (fdata.shared)) ? true : false}>Save</button>
                            </div>
                        </form>
                    </div>
                    {fdata.shared ? <CreateTaskContext.Provider value={{ user, setuser, users, setusers, sharewith, setsharewith, showFriends, setshowFriends, friends, setfriends, cancleButtonHandler }}><Sidebar /></CreateTaskContext.Provider> : ''}
                </div>
            }
        </>
    )
}

export default EditTask;