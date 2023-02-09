import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Popups, UserContext } from "../../../Context";
import api from "../../API/api";

const NavBar = () => {
  const { USER, setUSER } = useContext(UserContext);
  const { setLOADER, setMODAL } = useContext(Popups);
  const location = useLocation();
  const { getToken, deleteToken } = api();
  const [active, setActive] = useState({});

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActive({ home: "active" });
        break;
      case "/sign-in":
        setActive({ sign_in: "active" });
        break;
      case "/sign-up":
        setActive({ sign_up: "active" });
        break;
      case "/create-task":
        setActive({ create_task: "active" });
        break;
      case "/all-tasks":
        setActive({ main_menu: "active" });
        break;
      case "/profile":
        setActive({ profile: "active" });
        break;
      case "/activity":
        setActive({ activity: "active" });
        break;

      default:
        setActive({});
        break;
    }
  }, [location.pathname]);

  const logout = async () => {
    setLOADER(true);
    try {
      const token = getToken();
      const res = await fetch("http://localhost:5000/sign-out", {
        headers: { authtoken: token },
      });
      const { error, success } = await res.json();
      if (success) {
        deleteToken();
        setUSER(null);
        setLOADER(() => {
          console.log("now working");
          return false;
        });
        setLOADER(false);
      }
      console.log("helo");
    } catch (e) {
      setLOADER(false);
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">Sign out unsuccessful</span>
          </>
        ),
        body: (
          <>
            <span className="text-danger">
              There is some error in signing you out!
            </span>
          </>
        ),
        success: false,
      });
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-0 sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="https://raw.githubusercontent.com/srijan450/best-task-app/gh-pages/images/header.png"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          &nbsp;Task App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link
              className={`nav-link ${active.home}`}
              aria-current="page"
              to="/"
            >
              Home
            </Link>
            {USER ? (
              <>
                <Link
                  className={`nav-link ${active.create_task}`}
                  to="/create-task"
                >
                  Create Task
                </Link>
                <Link
                  to="/all-tasks"
                  className={`nav-link ${active.main_menu}`}
                >
                  All Tasks
                </Link>

                <Link
                  to="/profile"
                  className={`nav-link ${active.profile} d-sm-none`}
                >
                  Profile
                </Link>

                <Link
                  to="/activity"
                  className={`nav-link ${active.activity} d-sm-none`}
                >
                  Activity
                </Link>

                <Link to="/" className="nav-link" onClick={logout}>
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link className={`nav-link ${active.sign_in}`} to="/sign-in">
                  Sign In
                </Link>
                <Link className={`nav-link ${active.sign_up}`} to="/sign-up">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
