import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "../../utilities/Input/Input";
import Password from "../../utilities/Input/Password";
import SignUpHandler from "./SignUpHandler";
import "./signup.css";
import { UserContext } from "../../../Context";

const Signup = () => {
  const { ferror, fdata, Handler, usernameHandler, submitHandler } =
    SignUpHandler();
  const { USER } = useContext(UserContext);
  if (USER) return <Navigate to="/all-tasks" />;

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-5 col-12 order-lg-1 order-2 d-flex align-items-center py-3 shadow">
          <form className="w-75 mx-auto" onSubmit={submitHandler} method="post">
            <div className="fheader mb-4 text-center">
              <h2 className="my-0">Hello Friend</h2>
              <p>create your account to start using the app </p>
            </div>

            <Input
              name="name"
              type="text"
              label="name"
              icon="fa-person"
              placeholder="enter your name"
              value={fdata.name}
              error={ferror.name}
              ecolor={ferror.nameecolor}
              handler={Handler}
              pattern="^[a-zA-Z]{2,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$"
              title="enter your full name"
            />

            <Input
              name="username"
              type="text"
              label="username"
              icon="fa-user"
              placeholder="take a username"
              value={fdata.username}
              error={ferror.username}
              ecolor={ferror.usernameecolor}
              handler={usernameHandler}
              pattern="^[_]{1,2}[a-z]{4,}[0-9]{0,3}[.]{0,2}[_]{0,2}$"
              title="username should be atleast 5 character begining with _(underscore) could should combination of lowercase alphabeds(minimum-4), number(maximum-3), .(dot), _(underscore)"
            />

            <Input
              name="email"
              type="email"
              label="email address"
              icon="fa-at"
              placeholder="enter your email"
              value={fdata.email}
              error={ferror.email}
              ecolor={ferror.emailecolor}
              handler={Handler}
              title="please provide valid email"
            />

            <Password
              name="password"
              lable="password"
              value={fdata.password}
              handler={Handler}
              error={ferror.password}
              ecolor={ferror.passwordecolor}
            />

            <div className="text-center mt-1">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                <span>Already Have an account?</span>{" "}
                <Link className="text-decoration-none" to="/sign-in">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="col-xl-4 col-lg-5 col-12 order-lg-2 order-1 pb-5 d-flex align-items-center shadow">
          <div className="text-center px-5">
            <h3 className="my-5">Glad To See You!</h3>
            <p style={{ textAlign: "justify" }}>
              Welcome to <b>TaskShare+</b> - Your gateway to seamless task management!
              <br/><br/>
              Sign up now and unlock a world of productivity. With TaskShare+,
              you can effortlessly create and manage tasks, collaborate with
              your team, and stay on top of your projects. Get started by
              providing a few details, and you'll be on your way to a more
              organized and efficient workflow. Join our growing community of
              task achievers and experience the power of TaskShare+ firsthand.
              <br/><br/>
              Sign up today and let productivity soar to new heights!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
