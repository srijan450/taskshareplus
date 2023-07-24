import React from "react";
import { Link } from "react-router-dom";
import { Crousel } from "../../utilities/Crousel/Crousel";
import Footer from "../../utilities/Footer/Footer";
import "./home.css";
const Home = () => {
  return (
    <div className="w-100" style={{ minHeight: "100vh" }}>
      <div className="fullPager bg-purple py-5">
        <div
          className="row w-100 justify-content-between align-items-center h-100 padding"
        >
          
          <div
            className="col-lg-6 col-12 text-light"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "",
              justifyContent: "center",
              // minHeight: "90vh",
            }}
          >
            <h1>
              Introducing TaskShare+, all
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
        <div className="shadow py-5">
          <div className="fs-5 mx-auto w-lg-50 w-75 text-justify">
            Here is the platform for you, where you can manage your task more efficiently than ever. You can track your performance and all the tasks all together. 
            Colaborate your friends and contribute together. Move forward as a boss and never let the thing go out of the time.
            Track the pending item and work efficiently to get it done.
          </div>
        </div>
      </div>



      <div className="fullPager">
        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex flex-column justify-content-center align-items-center">
            <div>
          <h3>
            Create Your task
          </h3>
          <ul className="d-md-none d-none">
              <li>use custom task icon</li>
              <li>use various styling for task discription</li>
              <li>set date and time</li>
              <li>share with people</li>
          </ul>
          </div>
          </div>
          <div className="col-md-7 col-12">
          <div className="img_home w-100">
              <img src="./images/CreateTask-1.png" alt="" />
            </div>
          </div>
        </div>

        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex order-md-2 order-1 flex-column justify-content-center align-items-center">
            <div>
          <h3>
            Set expected  time for completion
          </h3>
         <p>set your time and chase it</p>
          </div>
          </div>
          <div className="col-md-7 col-12 order-md-1 order-2">
          <div className="img_home w-100">
              <img src="./images/CreateTask-2.png" alt="" />
            </div>
          </div>
        </div>
        
        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex flex-column justify-content-center align-items-center">
            <div>
            <h3>
            Set expected  date for completion
          </h3>
         <p>set your date and time and complete it before task run into pending category</p>
          </div>
          </div>
          <div className="col-md-7 col-12">
          <div className="img_home w-100">
              <img src="./images/CreateTask-3.png" alt="" />
            </div>
          </div>
        </div>

        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex order-md-2 order-1 flex-column justify-content-center align-items-center">
            <div>
          <h3>
            Share task with friends
          </h3>
         <p>you can share task with your friends by selecting share task checkbox and select the people with which you want this task to be shared.</p>
          </div>
          </div>
          <div className="col-md-7 col-12 order-md-1 order-2">
          <div className="img_home w-100">
              <img src="./images/CreateTask-4.png" alt="" />
            </div>
          </div>
        </div>


        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex flex-column justify-content-center align-items-center">
            <div>
          <h3>
            Set Profile Image
          </h3>
          <p>
          so that your friends can track you
          </p>
          </div>
          </div>
          <div className="col-md-7 col-12">
          <div className="img_home w-100">
              <img src="./images/profile.png" alt="" />
            </div>
          </div>
        </div>

        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex order-md-2 order-1 flex-column justify-content-center align-items-center">
            <div>
          <h3>
            Track All Tasks
          </h3>
          <p>Track all task all together, handling multiple task is ever easier</p>
          </div>
          </div>
          <div className="col-md-7 col-12 order-md-1 order-2">
          <div className="img_home w-100">
              <img src="./images/activity.png" alt="" />
            </div>
          </div>
        </div>

        <div className="row p-lg-5 p-md-4 p-3">
          <div className="col-md-5 col-12 d-md-flex flex-column justify-content-center align-items-center">
            <div>
          <h3>
            Take Benefit of task categories
          </h3>
         <p>automaticatlly changes the category of task as it run out of time</p>
          </div>
          </div>
          <div className="col-md-7 col-12">
          <div className="img_home w-100">
              <img src="./images/category.png" alt="" />
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Home;
