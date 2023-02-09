import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ContentLoader from "../../utilities/modals/ContentLoader";
import Button from "../../utilities/Navigation/Button";
import Paginate from "../../utilities/pagination/Paginate";
import TaskInfo from "../../utilities/Tasks-info-deep/TaskInfo";
import TaskCategoryHandler from "./TaskCategoryHandler";

const TaskCategory = () => {
  const { name } = useParams("name");
  const {
    verifyTaskCategoryAndRespond,
    tasks,
    previousHandler,
    nextHandler,
    skip,
    removeCompletedTask,
    deleteTask,
  } = TaskCategoryHandler();
  const [redirect, setredirect] = useState(false);
  useEffect(() => {
    const doStuff = async () => {
      setredirect(await verifyTaskCategoryAndRespond(name.trim()));
    };
    doStuff();
  }, [skip]);

  const setName = () => {
    switch (name) {
      case "completed-tasks":
        return "Completed Task";
      case "pending-tasks":
        return "Pending Task";
      case "shared-tasks":
        return "Shared Task";
      case "completed-shared-tasks":
        return "Completed Shared Task";
      case "pending-shared-tasks":
        return "Pending Shared Task";
      default: {
        return "Your Tasks";
      }
    }
  };
  if (redirect) return <Navigate to="/all-tasks" />;

  return (
    <div className="w-100 py-4" style={{ minHeight: "90vh" }}>
      <div
        className="row w-100 px-xl-5 px-lg-4 px-sm-3 px-2"
        style={{ alignItems: "center" }}
      >
        <div className="col-sm-9 col-12 d-flex align-items-center ms-sm-0 ms-1">
          <Button side="back" classes="me-4" />
          <h2 className="">{setName()}</h2>
        </div>
        <form className="col-3 d-sm-block px-0 d-none">
          <input
            type="search"
            placeholder="search by task heading"
            className="form-control"
          />
        </form>
        <hr className="col-12 my-1 mx-sm-1 text-danger mx-2" />
      </div>

      <div
        className="row w-100 mx-auto px-xl-5 px-sm-3 px-lg-4 px-1 justify-content-between"
        style={{ maxHeight: "77vh", overflowY: "auto", overflowX: "hidden" }}
      >
        {tasks ? (
          tasks.map((items, ind) => (
            <TaskInfo
              data={items}
              removeCompletedTask={removeCompletedTask}
              name={name}
              ind={ind}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <ContentLoader />
        )}
      </div>
      {tasks && tasks.length === 0 && (
        <>
          <div className="text-center my-3 text-danger">
            No <span className="text-lowercase">{setName()}</span> to show here!
          </div>
        </>
      )}

      {tasks && tasks.length === 10 && (
        <Paginate nextHandler={nextHandler} previousHandler={previousHandler} />
      )}
    </div>
  );
};

export default TaskCategory;
