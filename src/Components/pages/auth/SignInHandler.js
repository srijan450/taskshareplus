import React, { useContext, useState } from "react";
import { Popups, UserContext } from "../../../Context";
import api from "../../API/api";

const regex = [
  /^[_]{1,2}[a-z]{4,}[0-9]{0,3}[.]{0,2}[_]{0,2}$/,
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
];

const SignInHandler = () => {
  const { setLOADER, setMODAL } = useContext(Popups);
  const { setUSER } = useContext(UserContext);
  const { loginauth } = api();

  const [ferror, setferror] = useState({
    email_user: "",
    password: "",
    email_userecolor: "",
    passwordecolor: "",
  });
  const [fdata, setfdata] = useState({ email_user: "", password: "" });
  const [valid, setvalid] = useState({ email_user: false, password: false });

  const [fieldset, setfieldset] = useState({
    type: "text",
    label: "Email or Username",
    icon: "fa-user",
    placeholder: "enter username or password",
    pattern: regex[0],
    title: "username or email is required",
  });

  const setBorder = (e, val = false, text = "", color = "danger") => {
    if (val) {
      e.style.borderColor = "#28a745";
      e.style.boxShadow = "0 0 0 0.2rem rgba(40, 167, 69, 0.25)";
    } else {
      e.style.borderColor = "#28a745";
      e.style.boxShadow = "0 0 0 0.2rem rgba(167, 40, 40, 0.25)";
    }
    setferror((prev) => {
      return {
        ...prev,
        [e.name]: text,
        [`${e.name}ecolor`]: color,
      };
    });
    setvalid((prev) => {
      return { ...prev, [e.name]: val };
    });
  };

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setfdata({ ...fdata, [name]: value.trim() });
    if (!value.match(regex[2])) {
      setBorder(e.target, false, "invalid password");
    } else {
      setBorder(e.target, true);
    }
  };

  const usernameHandler = (e) => {
    const { value } = e.target;
    setfdata({ ...fdata, email_user: value.trim() });
    if (value[0] === "_") {
      setfieldset({
        type: "text",
        label: "your username",
        icon: "fa-user",
        placeholder: "enter your username",
        pattern: "^[_]{1,2}[a-z]{4,}[0-9]{0,3}[.]{0,2}[_]{0,2}$",
        title:
          "username should be atleast 5 character begining with _(underscore) could should combination of lowercase alphabeds(minimum-4), number(maximum-3), .(dot), _(underscore)",
      });
      if (!value.match(regex[0])) {
        setBorder(e.target, false, "invalid username");
      } else {
        setBorder(e.target, true);
      }
    } else if (value && value[0].match(/^[a-z0-9]$/)) {
      setfieldset({
        type: "email",
        label: "your email",
        icon: "fa-at",
        placeholder: "enter username or password",
        pattern:
          '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$',
        title: "please provide valid email",
      });
      if (!value.match(regex[1])) {
        setBorder(e.target, false, "invalid email");
      } else {
        setBorder(e.target, true);
      }
    } else if (value === "") {
      setfieldset({
        type: "text",
        label: "email or username",
        icon: "fa-user",
        placeholder: "enter username or password",
        pattern: regex[0],
        title: "username or email is required",
      });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { email_user, password } = valid;

      if (!email_user) {
        setMODAL({
          show: true,
          header: (
            <>
              <span className="text-danger">Not Registered</span>
            </>
          ),
          body: (
            <>
              <strong>{fdata.email_user}</strong> {ferror.email_user}
            </>
          ),
          success: false,
        });
        return;
      }

      if (email_user && password) {
        setLOADER(true);
        const res = await fetch("https://best-task-app.herokuapp.com/sign-in", {
          method: "POST",
          body: JSON.stringify(fdata),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        const { error, success, user, token } = response;
        if (error && !success) {
          if (error.email) {
            setBorder(e.target.elements.email_user, false, error.email);
            setLOADER(false);
          }
          if (error.password) {
            setBorder(e.target.elements.password, false, error.password);
            setfdata({ ...fdata, password: "" });
            setLOADER(false);
          }
        } else if (success) {
          setfdata({ email_user: "", password: "" });
          loginauth(user, token);
        }
        setLOADER(false);
      }
    } catch (e) {
      setLOADER(false);
      console.log(e);
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">Login Failed</span>
          </>
        ),
        body: (
          <>
            <span className="text-danger">
              Cannot log you in at this moment!
            </span>
          </>
        ),
        success: false,
      });
    }
  };
  return {
    fieldset,
    ferror,
    fdata,
    passwordHandler,
    usernameHandler,
    submitHandler,
  };
};

export default SignInHandler;
