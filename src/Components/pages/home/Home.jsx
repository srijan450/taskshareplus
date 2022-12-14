import React from "react";
import { Link } from "react-router-dom";
import { Crousel } from "../../utilities/Crousel/Crousel";
import Footer from "../../utilities/Footer/Footer";
import "./home.css";
const Home = () => {
  return (
    <div className="w-100" style={{ minHeight: "100vh" }}>
      <div className="fullPager bg-purple">
        <div
          className="row w-100 justify-content-between align-items-center h-100 padding"
        >
          
          <div
            className="col-5 col-lg-6 col-12 text-light"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "",
              justifyContent: "center",
              // minHeight: "90vh",
            }}
          >
            <h1>
              Introducing <span className="text-uppercase">task app</span>, all
              new way to manage your tasks
            </h1>

            <h2 className="mt-5">Key Featuers</h2>
            <ul>
              <li>share with friends and work together</li>
              <li> match the clock and track your progress</li>
              <li>style your task, set timer, edit and delete</li>
              <li>Track pending tasks, shared tasks and completed tasks</li>
              <li>Made with love and for time management</li>
            </ul>
          </div>
          <div
            className="col-xl-4 col-lg-5 col-12 text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "",
              justifyContent: "center",
            }}
          >
            <div className="bg-light pt-4 pb-5 rounded">
              <h3 className="mb-4">Let's Get Started</h3>

              <div>
                <Link to="/sign-in" className="text-light text-decoration-none">
                  <div className="btn w-75 btn-primary shadow bold-1">
                    Sign In
                  </div>
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-center my-3">
                <hr style={{ width: "30%" }} />
                <span className="px-3">OR</span>
                <hr style={{ width: "30%" }} />
              </div>
              <div>
                <Link to="/sign-up" className="text-light text-decoration-none">
                  <div className="btn w-75 shadow-lg btn-success">Sign Up</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fullPager py-5">
        <h1 className="text-center my-3">Be in charge of your tasks</h1>
        <p className="text-center mt-4 mb-5">
          Dristribute your tasks among different categories and conclude them
          off
        </p>
        <div className="liner-grey-background">
          <div className="img_home">
            <img src="./images/main-page.png" alt="" />
          </div>
        </div>
      </div>
      <div className="fullPager">
        <h1>Key Features</h1>
        <div className="row">
          <div className="col-5"></div>
          <div className="col-7">
            <div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
