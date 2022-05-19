import React, { useContext, useState } from 'react'
import { Popups, UserContext } from '../../../Context';
import api from '../../API/api';


const regex = [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/];

const forgotPasswordHandler = () => {
    const { setLOADER, setMODAL } = useContext(Popups);

    const [ferror, setferror] = useState({ email: "", emailecolor: "" });
    const [fdata, setfdata] = useState({ email: "" });
    const [valid, setvalid] = useState({ email: false });
    const { postApi } = api();

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

    const emailHandler = (e) => {
        const { value } = e.target;
        setfdata({ ...fdata, email: value.trim() });
        if (!value.match(regex[0])) {
            setBorder(e.target, false, "invalid email");
        } else {
            setBorder(e.target, true);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { email } = valid;

            if (!email) {
                setMODAL({ show: true, header: <><span className='text-danger'>Not Registered</span></>, body: <><strong>{fdata.email}</strong> {ferror.email}</>, success: false });
                return;
            }

            if (email) {

                const { error, success } = await postApi("password-change-request", true, fdata);
                if (error) {
                    setMODAL({ show: true, header: <><span className='text-danger text-uppercase'>{error}</span></>, body: <><p className='text-center fw-bold'>Failed</p></>, success: false });

                }
                else if (success) {
                    const email = fdata.email;
                    setfdata({ email: "", password: "" })
                    setMODAL({ show: true, header: <><span className='text-success text-uppercase'>Link Sent</span></>, body: <><p className='text-center'>Password reset page link is sent to <strong>{email}</strong></p></>, success: true });
                }
                setLOADER(false);
            }
        }
        catch (e) {
            setLOADER(false);
            setMODAL({ show: true, header: <><span className="text-danger">No Internet</span></>, body: <><span className="text-danger">You are not connected to internet!</span></>, success: false });
        }
    }
    return { ferror, fdata, emailHandler, submitHandler };
}

export default forgotPasswordHandler;