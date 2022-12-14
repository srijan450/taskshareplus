import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../Context";
import TaskInfo from "../../utilities/taskInfo/TaskInfo";
import "./menu.css";
const Menu = () => {
  const { USER } = useContext(UserContext);

  if (!USER) return <Navigate to="/sign-in" />;

  return (
    <div className="w-100 border">
      <div className="w-100 row ">
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 d-sm-block d-none mx-auto">
          <div className="mx-md-auto px-md-1 my-5">
            <ul className="navbar-nav ">
              <a href="#your-task" className="dropdown-item">
                Your Task
              </a>
              <a href="#completed-task" className="dropdown-item">
                Completed Task
              </a>
              <a href="#shared-task" className="dropdown-item">
                Shared Task
              </a>
              <a href="#completed-shared-task" className="dropdown-item">
                Completed Shared Task
              </a>
              <a href="#pending-shared-task" className="dropdown-item">
                Pending Shared Task
              </a>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <Link to="/activity" className="dropdown-item">
                Activity
              </Link>
            </ul>
          </div>
        </div>
        <div
          className="col-xxl-10 col-xl-10 col-lg-9 col-md-9 col-sm-8 col-0 mx-auto overflow-auto"
          style={{ height: "90vh" }}
        >
          <section className="section" id="your-task">
            <h2>
              <Link
                to="/your-tasks"
                className="text-decoration-none text-dark hover"
              >
                Your Tasks
              </Link>
            </h2>
            <TaskInfo action={""} notask="Create task to see here!" />
          </section>

          <section className="section" id="completed-task">
            <h2>
              <Link
                to="/completed-tasks"
                className="text-decoration-none text-dark hover"
              >
                Completed Tasks
              </Link>
            </h2>
            <TaskInfo
              action={"completed"}
              notask="None of your task is completed!"
            />
          </section>
          <section className="section" id="pending-task">
            <h2>
              <Link
                to="/pending-tasks"
                className="text-decoration-none text-dark hover"
              >
                Pending Task
              </Link>
            </h2>
            <TaskInfo
              action={"pending"}
              notask="None of your task is pending!"
            />
          </section>

          <section className="section" id="shared-task">
            <h2>
              <Link
                to="/shared-tasks"
                className="text-decoration-none text-dark hover"
              >
                Shared Tasks
              </Link>
            </h2>
            <TaskInfo action={"shared"} notask="None of your task is shared!" />
          </section>

          <section className="section" id="completed-shared-task">
            <h2>
              <Link
                to="/completed-shared-tasks"
                className="text-decoration-none text-dark hover"
              >
                Completed Shared Tasks
              </Link>
            </h2>
            <TaskInfo
              action={"completedshared"}
              notask="None of your shared task is completed!"
            />
          </section>

          <section className="section" id="pending-shared-task">
            <h2>
              <Link
                to="/pending-shared-tasks"
                className="text-decoration-none text-dark hover"
              >
                Pending Shared Task
              </Link>
            </h2>
            <TaskInfo
              action={"pendingshared"}
              notask="None of your shared task is pending!"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Menu;
