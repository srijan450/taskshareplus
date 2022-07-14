
import React, { useContext, useState } from "react";

import { Popups } from "../../../Context";

const regex = [/^[a-zA-Z]{2,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/, /^[_]{1,2}[a-z]{4,}[0-9]{0,3}[.]{0,2}[_]{0,2}$/, /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/];
const SignUpHandler = () => {
    const { setLOADER, setMODAL } = useContext(Popups);

    const [ferror, setferror] = useState({ username: "", name: "", email: "", password: "", nameecolor: "", emailecolor: "", passwordecolor: "", usernameecolor: "" });
    const [fdata, setfdata] = useState({ name: "", email: "", password: "", username: "" });
    const [valid, setvalid] = useState({ name: false, username: false, email: false, password: false });

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
                [(e.name)]: text,
                [`${e.name}ecolor`]: color
            };
        });
        setvalid((prev) => {
            return { ...prev, [(e.name)]: val };
        });
    }

    const Handler = (e) => {
        const { name, value } = e.target;
        setfdata({ ...fdata, [name]: value });
        if (name === "name") {
            if (!value.match(regex[0])) {
                setBorder(e.target, false, "please provide full name");
            } else {
                setBorder(e.target, true);
            }
        }

        else if (name === "email") {
            if (!value.match(regex[2])) {
                setBorder(e.target, false, "please provide valid email");
            } else {
                setBorder(e.target, true);
            }
        }
        else if (name === "password") {
            if (!value.match(regex[3])) {
                setBorder(e.target, false, "invalid password");
            } else {
                setBorder(e.target, true);
            }
        }
    }

    const usernameHandler = async (e) => {

        const { name, value } = e.target;
        setfdata({ ...fdata, [name]: value.trim().toLowerCase() });
        try {
            if (!value.match(regex[1])) {
                setBorder(e.target, false, "invalid username");
            } else {
                const res = await fetch(`http://localhost:5000/ensureuniqueusername/${value}`);
                const { err } = await res.json();
                if (err) {
                    setBorder(e.target, false, `${value} is already taken!`);
                } else {
                    setBorder(e.target, true);
                }
            }
        }
        catch (e) {
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { name, username, email, password } = valid;

            if (!username) {

                setMODAL({ show: true, header: <><span className="text-danger">Already Registered</span></>, body: ferror.username, success: false });
                return;
            }
            if (!email) {
                setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
                return;
            }

            if (name && username && email && password) {
                setLOADER(true);
                const res = await fetch('http://localhost:5000/sign-up', { method: 'POST', body: (JSON.stringify(fdata)), headers: { "Content-Type": "application/json" } });
                const response = await res.json()
                const { error, success } = response;
                console.log(error)
                console.log(success)
                if (error && !success) {
                    if (error.name) {
                        setBorder(e.target.elements.name, false, error.name);
                    }
                    if (error.username) {
                        setBorder(e.target.elements.username, false, error.username);
                    }
                    if (error.email) {
                        setBorder(e.target.elements.email, false, error.email);
                    }
                    if (error.password) {
                        setBorder(e.target.elements.password, false, error.password);
                    }

                }
                else if (success) {
                    setfdata({ name: "", email: "", password: "", username: "" });
                    setMODAL({
                        show: true, header: <><span className="text-success">Sign Up Successful!</span></>, body: <><span className="text-dark text-center"><h5 className="text-uppercase text-center">Welcome to community!</h5><p className="">Verify your account to sign in into your account.</p>
                            <p className="text-primary text-center">Verification link is sent to your email!</p></span></>, success: true
                    });
                }
                setLOADER(false);
            }
        }
        catch (e) {
            setLOADER(false);
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
    }

    return { ferror, fdata, Handler, usernameHandler, submitHandler };
}

export default SignUpHandler;