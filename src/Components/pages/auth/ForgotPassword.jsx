import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../Context";
import Input from "../../utilities/Input/Input";
import forgotPasswordHandler from "./forgotPasswordHandler";

const ForgotPassword = () => {
  const { ferror, fdata, emailHandler, submitHandler } =
    forgotPasswordHandler();
  const { USER } = useContext(UserContext);
  if (USER) return <Navigate to="/main-menu" />;

  return (
    <>
      <div className="w-100">
        <div className="d-flex align-items-center w-75 mx-auto py-5 shadow">
          <form className="w-100 mx-auto px-5" onSubmit={submitHandler} method="post">
            <div className="fheader mb-4 text-center">
              <h2 className="my-0">Provide Account Details</h2>
              <p>password change link will be sent to your email</p>
            </div> 

            <Input
              name="email"
              type="email"
              label="email address"
              icon="fa-at"
              placeholder="enter your email"
              value={fdata.email}
              error={ferror.email}
              ecolor={ferror.emailecolor}
              handler={emailHandler}
              title="please provide valid email"
            />

            <div className="text-center mt-0">
              <button type="submit" className="btn btn-primary text-uppercase">
                Proceed
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                <span></span>{" "}
                <Link
                  className="text-decoration-none text-uppercase"
                  to="/sign-in"
                >
                  Back to Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
