import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TitleIcon from "@mui/icons-material/Title";
import "./CreateTask.css";
import Editor from "../../utilities/editor/Editor.jsx";
import { CreateTaskContext, Popups, UserContext } from "../../../Context";
import { Navigate, useParams } from "react-router-dom";
import Sidebar from "../../utilities/createTaskSidebar/Sidebar";
import api from "../../API/api";

const CreateTask = () => {
  const [quill, setquill] = useState(null); // editor
  const [fdata, setfdata] = useState({
    header: "",
    body: "",
    durationDate: "",
    durationTime: "",
    taskIcon: "",
    shared: false,
  }); // fdata
  const { setLOADER, setMODAL } = useContext(Popups); // modal and loader
  const { USER } = useContext(UserContext); // for authentication
  const [user, setuser] = useState(""); //input box
  const [users, setusers] = useState(null); // to store data from search API
  const [sharewith, setsharewith] = useState([]); // for selected users defaults friends
  const [showFriends, setshowFriends] = useState(true); // show sidebar 2nd container
  const [friends, setfriends] = useState(null); // show previous friends
  const [redirect, setredirect] = useState(false);
  const { getToken } = api();

  const { id } = useParams("id");

  const handler = (e) => {
    const { name, value, files } = e.target;
    if (name === "taskIcon") {
      if (files[0].type.split("/")[0] === "image") {
        setfdata({ ...fdata, [name]: files[0] });
        const [file] = files;
        document.getElementById("iconImage").src = URL.createObjectURL(file);
      } else {
        setMODAL({
          show: true,
          header: (
            <>
              <span className="text-danger">Task Icon should be image</span>
            </>
          ),
          body: (
            <>
              <span className="text-dark">
                Task Icon should be of image format.
              </span>
            </>
          ),
          success: false,
        });
      }
    } else {
      if (name === "header" && value.trim() === "") setBorder(e.target);
      else if (name === "durationDate" && new Date(value) < new Date()) {
        setMODAL({
          show: true,
          header: <>Date Error</>,
          body: (
            <>
              <span className="text-danger">Please select future date!</span>
            </>
          ),
          success: false,
        });
        return;
      } else if (
        name === "durationTime" &&
        !fdata.durationDate &&
        new Date().setHours(
          parseInt(value.split(":")[0]),
          parseInt(value.split(":")[1])
        ) -
          new Date().getTime() <
          0
      ) {
        setMODAL({
          show: true,
          header: <>Time Error</>,
          body: (
            <>
              <span className="text-danger">Please select future time!</span>
            </>
          ),
          success: false,
        });
        return;
      }

      setfdata({ ...fdata, [name]: value });
    }
  };

  const setBorder = (e, val = false, reset = false) => {
    if (val) {
      e.style.borderColor = "#28a745";
      e.style.boxShadow = "0 0 0 0.2rem rgba(40, 167, 69, 0.25)";
    } else {
      e.style.borderColor = "#28a745";
      e.style.boxShadow = "0 0 0 0.2rem rgba(167, 40, 40, 0.25)";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (fdata.shared && friends.length == 0) {
      setMODAL({
        show: true,
        header: <></>,
        body: (
          <>
            <span className="text-dark">
              Please select users with whoom you want to share this task.
            </span>
          </>
        ),
        success: false,
      });
      return;
    }
    if (fdata.header.trim()) {
      setLOADER(true);
      const formdata = new FormData();
      formdata.append("header", fdata.header);
      formdata.append("body", fdata.body);
      formdata.append("createdDate", new Date().toUTCString());
      formdata.append("durationDate", fdata.durationDate);
      formdata.append("durationTime", fdata.durationTime);
      formdata.append("taskIcon", fdata.taskIcon);
      formdata.append("shared", fdata.shared);
      if (fdata.shared) {
        formdata.append("sharewith", friends);
      }
      console.log(new Date());
      try {
        const token = getToken();
        const res = await Axios.post(
          "http://localhost:5000/create-task",
          formdata,
          { headers: { authtoken: token } }
        );

        const {
          data: { error, task },
        } = res;
        if (error) {
          console.log(error);
        } else {
          const { _id, shared } = task;
          setfdata({
            header: "",
            body: "",
            durationDate: "",
            durationTime: "",
            taskIcon: "",
            shared: false,
          });
          quill.root.innerHTML = "";
          e.target.style.borderColor = "transparent";
          e.target.header.style.boxShadow = "0 0 0 .25rem rgba(13,110,253,.25)";
          setredirect(true);
        }
      } catch (e) {
        console.log(e);
        setMODAL({
          show: true,
          header: (
            <>
              <span className="text-danger">No Internet</span>
            </>
          ),
          body: (
            <>
              <span className="text-danger">
                You are not connected to internet!
              </span>
            </>
          ),
          success: false,
        });
      }
    } else {
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">Task title is required!</span>
          </>
        ),
        body: (
          <>
            <span className="text-dark">Task Title must be be provided.</span>
          </>
        ),
        success: false,
      });
    }
    setLOADER(false);
  };

  return (
    <>
      <div className="row w-100 justify-content-center">
        <div
          className={`col-xl-8 ${
            fdata.shared ? "col-lg-8 col-md-8" : "col-lg-9 col-md-10"
          } order-md-1 order-2 py-4 shadow`}
        >
          <div className="px-0 px-sm-1 px-md-2 px-lg-3 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <label htmlFor="image">
                <div className="img">
                  <img
                    src="https://raw.githubusercontent.com/srijan450/best-task-app/gh-pages/images/no-image.jpg"
                    id="iconImage"
                    alt="cannot display image"
                    title="task icon"
                  />
                </div>
                <input
                  type="file"
                  id="image"
                  name="taskIcon"
                  className="d-none"
                  accept=".png, .jpg, .jpeg"
                  onChange={handler}
                  value={fdata.iconImage}
                  form="createTaskform"
                />
              </label>
              <h2 className="mx-3 text-uppercase">create task</h2>
            </div>
            <div>
              <input
                type="date"
                form="createTaskform"
                name="durationDate"
                title="select end date"
                onChange={handler}
                value={fdata.durationDate}
              />
              <input
                type="time"
                name="durationTime"
                onChange={handler}
                value={fdata.durationTime}
                title="select end time"
                form="createTaskform"
              />
            </div>
          </div>
          <hr className="my-1" />
          <form
            className="px-0 px-sm-1 px-md-2 px-lg-3 py-4"
            id="createTaskform"
            onSubmit={submitHandler}
            encType="multipart/form-data"
            action=""
            method="POST"
          >
            <div className="mb-3">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <TitleIcon />{" "}
                </span>
                <input
                  type="text"
                  name="header"
                  value={fdata.header}
                  onChange={handler}
                  className="form-control"
                  placeholder="title for task..."
                  aria-label="header"
                  aria-describedby="basic-addon1"
                  title="title for task"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <span className="input-group-text" style={{ height: "42px" }}>
                {" "}
                <DescriptionOutlinedIcon />
              </span>
              <Editor
                quill={quill}
                setquill={setquill}
                setfdata={setfdata}
                fdata={fdata}
              />
            </div>

            <div className="row px-3">
              {/* <button className='btn btn-danger me-2' onClick={() => setfdata({ ...fdata, shared: !fdata.shared })} >Shared</button> */}
              <div className="my-2 d-flex justify-content-end">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="shared"
                    checked={fdata.shared}
                    defaultValue
                    onChange={(e) =>
                      setfdata({ ...fdata, shared: e.target.checked })
                    }
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label text-uppercase"
                    htmlFor="flexCheckDefault"
                  >
                    Shared
                  </label>
                </div>
              </div>
              <div className="col-12 px-0">
                <button
                  className="btn btn-success w-100"
                  disabled={!fdata.header.trim() && fdata.shared ? true : false}
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
        {fdata.shared ? (
          <CreateTaskContext.Provider
            value={{
              user,
              setuser,
              users,
              setusers,
              sharewith,
              setsharewith,
              showFriends,
              setshowFriends,
              friends,
              setfriends,
            }}
          >
            <Sidebar />
          </CreateTaskContext.Provider>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CreateTask;
