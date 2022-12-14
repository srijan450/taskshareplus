import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import api from "../../API/api";
import Calander from "../../utilities/DateAndTime/Calander";
import Clock from "../../utilities/DateAndTime/Clock";
import ViewTaskOptions from "../../utilities/Options/ViewTaskOptions";

import "./TaskView.css";
import Button from "../../utilities/Navigation/Button";
import { useContext } from "react";
import { UserContext } from "../../../Context";
const TaskView = () => {
  const { USER } = useContext(UserContext);
  const { id } = useParams("id");
  const { getTaskApi } = api();
  const [task, settask] = useState(null);
  const [error, seterror] = useState(false);
  const [owner, setOwner] = useState("You");

  useEffect(() => {
    const FetchTask = async () => {
      const { error, task } = await getTaskApi(`task/${id}`, true);
      if (error) {
        seterror(true);
      } else {
        settask(task);
        if (USER && task.owner !== USER._id) {
          const { result, error } = await getTaskApi(
            `find-user-by-id?search=${task.owner}`
          );
          setOwner(result);
        }
      }
    };
    FetchTask();
  }, []);

  if (error) return <Navigate to="/error-page" />;

  return (
    task && (
      <div className="w-100 py-4 px-4" style={{ minHeight: "90vh" }}>
        <div className="shadow px-md-4 px-1 py-4">
          <div
            className="border border-danger p-1"
            style={{ borderRadius: "20px" }}
          >
            <div className="" style={{ alignItems: "center" }}>
              <div
                className="row col-12 px-4 justify-content-between"
                style={{ alignItems: "center" }}
              >
                <div className="col-3 d-flex align-items-center">
                  <Button side="back" classes="me-4" />
                  <div className="img">
                    <img
                      src={
                        task.taskIcon !== ""
                          ? `https://best-task-app.herokuapp.com/taskimage/${task._id}`
                          : "https://raw.githubusercontent.com/srijan450/best-task-app/gh-pages/images/no-image.jpg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-2 row justify-content-end">
                  <div className="col-8 d-flex justify-content-end align-items-center">
                    {task.durationDate || task.durationTime ? (
                      <Clock
                        date={task.durationDate}
                        time={task.durationTime}
                      />
                    ) : (
                      ""
                    )}
                    {USER._id === task.owner && (
                      <div className="mx-4 col-1">
                        <ViewTaskOptions
                          id={task._id}
                          completed={task.completed}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-1" />
            <div>
              <h1 className=" text-break">{task.header}</h1>
            </div>
            <hr className="my-0" />
            <div
              className="bg-light px-2 py-3 text-break text-justify"
              dangerouslySetInnerHTML={{ __html: task.body }}
            ></div>
            <hr className="my-0" />
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <span className="text-danger">Created by &nbsp;</span>: {owner}
              </div>
              <div className="d-flex justify-content-end my-2">
                <Calander
                  date={task.createdDate}
                  text="START DATE"
                  classes="mx-2"
                />
                {task.durationDate ? (
                  <Calander date={task.createdDate} text="END DATE" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskView;
