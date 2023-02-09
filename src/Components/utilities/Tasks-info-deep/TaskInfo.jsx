import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Calander from "../DateAndTime/Calander";
import Timer from "../DateAndTime/Timer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import "./style.css";
import { UserContext } from "../../../Context";
import api from "../../API/api";
import Clock from "../DateAndTime/Clock";
import ViewTaskOptions from "../Options/ViewTaskOptions";
import ThreeDotOption from "../Options/ThreeDotOption";
const TaskInfo = ({
  data: {
    _id,
    owner,
    header,
    body,
    durationDate,
    durationTime,
    createdDate,
    taskIcon,
    completed,
  },
  removeCompletedTask,
  name,
  ind,
  deleteTask,
}) => {
  const { deleteTaskHandler } = api();

  const { USER } = useContext(UserContext);

  if (!USER) return <Navigate to="/" />;
  return (
    <div className="py-2 px-sm-2 px-2 border border-2 my-2 mx-0">
      <div
        className="row w-100 justify-content-between"
        style={{ alignItems: "center" }}
      >
        <div
          className="row col-lg-11 col-sm-10 col-6 align-items-center ms-1"
          style={{ alignItems: "center" }}
        >
          <div className="img col-1">
            <img
              src={
                taskIcon !== ""
                  ? `http://localhost:5000/taskimage/${_id}`
                  : "https://raw.githubusercontent.com/srijan450/best-task-app/gh-pages/images/no-image.jpg"
              }
              alt=""
            />
          </div>
          <h3 className="col-lg-11 col-md-10 col-sm-10 d-sm-block d-none manageOverflow">
            <Link
              to={`/view-task/${_id}`}
              className=" text-decoration-none text-dark"
            >
              {header}
            </Link>
          </h3>
        </div>
        <div className="col-sm-1 col-2 d-grid justify-content-end text-end">
          {durationDate || durationTime ? (
            <Clock date={durationDate} time={durationTime} />
          ) : (
            ""
          )}
        </div>
      </div>

      <h3 className="d-sm-none manageOverflow">
        <Link
          to={`/view-task/${_id}`}
          className=" text-decoration-none text-dark"
        >
          {header}
        </Link>
      </h3>

      <div
        className="task-body my-2 mh-50 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
      <div
        className="row justify-content-between mt-0"
        style={{ alignItems: "end" }}
      >
        <div className="d-sm-none d-flex col-3 justify-content-start">
          <ThreeDotOption id={_id} completed={completed} />
        </div>
        <div className="col-3 d-sm-flex d-none justify-content-start">
          <Link
            to={`/view-task/${_id}`}
            className="btn viewTaskHover me-3"
            title="View Task"
          >
            <AssignmentIcon />
          </Link>

          {!completed && USER._id === owner ? (
            <>
              <button
                onClick={() => removeCompletedTask(_id, name, ind)}
                className="btn markAsConpleted me-3"
                title="MArk As Completed Task"
              >
                <AssignmentTurnedInIcon />
              </button>
              <Link
                to={`/edit-task/${_id}`}
                className="btn editHover me-3"
                title="Edit Task"
              >
                <EditIcon />
              </Link>
            </>
          ) : (
            ""
          )}

          {USER._id === owner && (
            <>
              <button
                onClick={() => deleteTask(_id, name, ind)}
                className="btn deleteHover"
                title="Delete Task"
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
        <div className="col-sm-2 col-6 d-grid justify-content-end  ">
          <Calander date={createdDate} text="created date" />
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
