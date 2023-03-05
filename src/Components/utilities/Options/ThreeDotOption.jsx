import React, { useContext, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./ViewTaskOptions.css";
import { Link, Navigate } from "react-router-dom";
import { Popups } from "../../../Context";
import useApi from "../../API/api";
import { useEffect } from "react";

const ThreeDotOption = ({ id, completed }) => {
  const [show, setshow] = useState(false);
  const { markAsComplete, markAsIncomplete, deleteTaskHandler } = useApi();
  const handler = () => {
    window.$(`#${id}`).toggle(500, () => {
      if (!show) {
        window.$(`#${id}`).addClass("d-flex");
        setshow(true);
      } else {
        window.$(`#${id}`).removeClass("d-flex");
        setshow(false);
      }
    });
  };
  const [redirect, setredirect] = useState(false);
  const [complete, setcomplete] = useState(completed);

  useEffect(() => {}, [completed]);

  if (redirect) return <Navigate to="/all-tasks" />;
  return (
    <div>
      <button className="btn border" onClick={handler}>
        <div className="">
          <MoreHorizIcon />
        </div>
      </button>
      <div
        className="threeDot shadow px-2 py-2 showsetting justify-content-between"
        id={id}
      >
        <Link
          to={`/view-task/${id}`}
          className="btn border border-2  viewTaskHover"
          title="View Task"
        >
          <AssignmentIcon />
        </Link>

        {complete ? (
          <button
            className="btn markAsConpleted border border-2 viewTaskHover"
            onClick={() => markAsIncomplete(id, setcomplete)}
            title="Mark As Incomplete"
          >
            <AssignmentLateIcon />
          </button>
        ) : (
          ""
        )}
        {!complete ? (
          <>
            <button
              onClick={() => markAsComplete(id, setcomplete)}
              className="btn markAsConpleted border border-2 text-success"
              title="Mark As Complete"
            >
              <AssignmentTurnedInIcon />
            </button>
            <Link
              to={`/edit-task/${id}`}
              className="btn border border-2 text-warning editHover"
              title="Edit Task"
            >
              <EditIcon />
            </Link>{" "}
          </>
        ) : (
          ""
        )}
        <button
          className="btn border border-2 text-danger deleteHover"
          title="Delete Task"
          onClick={() => deleteTaskHandler(id, setredirect)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default ThreeDotOption;
