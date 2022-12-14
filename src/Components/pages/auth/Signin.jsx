import React, { useContext } from "react";
import Input from "../../utilities/Input/Input";
import Password from "../../utilities/Input/Password";
import { Link, Navigate } from "react-router-dom";
import SignInHandler from "./SignInHandler";
import { UserContext } from "../../../Context";

const Signin = () => {
  const {
    fieldset,
    ferror,
    fdata,
    passwordHandler,
    usernameHandler,
    submitHandler,
  } = SignInHandler();
  const { USER } = useContext(UserContext);
  if (USER) return <Navigate to="/main-menu" />;

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
              name="email_user"
              type={fieldset.type}
              label={fieldset.label}
              icon={fieldset.icon}
              placeholder={fieldset.placeholder}
              value={fdata.email_user}
              error={ferror.email_user}
              ecolor={ferror.email_userecolor}
              handler={usernameHandler}
              pattern={fieldset.pattern}
              title={fieldset.title}
            />

            <Password
              name="password"
              lable="password"
              value={fdata.password}
              handler={passwordHandler}
              error={ferror.password}
              ecolor={ferror.passwordecolor}
            />

            <p className="mt-0 text-end">
              <Link className="text-decoration-none" to="/forgot-password">
                Forgot Password?
              </Link>
            </p>
            <div className="text-center mt-0">
              <button type="submit" className="btn btn-success">
                Sign In
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                <span>Don't Have an account?</span>{" "}
                <Link className="text-decoration-none" to="/sign-up">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="col-xl-4 col-lg-5 col-12 order-lg-2 order-1 d-flex align-items-center shadow pb-5">
          <div className="text-center px-5">
            <h3 className="my-5">Welcome Back!</h3>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              placeat est similique provident dolores voluptas atque maxime
              dignissimos reprehenderit? Ullam sequi quaerat officiis,
              voluptates sapiente odio numquam voluptas a eius?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
