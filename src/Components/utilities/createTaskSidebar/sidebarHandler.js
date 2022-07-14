import React, { useContext, useState } from 'react'
import { CreateTaskContext } from '../../../Context';

const sidebarHandler = () => {
    const { setuser, setshowFriends } = useContext(CreateTaskContext);

    const setBorder = (e, val = false, reset = false) => {
        if (val) {
            e.style.borderColor = "#28a745";
            e.style.boxShadow = "0 0 0 0.2rem rgba(40, 167, 69, 0.25)";

        } else {
            e.style.borderColor = "#28a745";
            e.style.boxShadow = "0 0 0 0.2rem rgba(167, 40, 40, 0.25)";
        }
        if (reset) {
            console.log(e);
            e.style.borderColor = "transparent";
            e.style.boxShadow = "0 0 0 0.2rem rgba(167, 40, 40, 0)";
            e.classList.add('border')
        }
    }

    const usernameHandler = (e) => {
        const { value } = e.target;
        setshowFriends(false);
        setuser(value.trim())
        if (!value.match(/^[_]{1,2}[a-z]*[0-9]*[.]*[_]*$/)) {
            setBorder(e.target, false);
        } else {
            setBorder(e.target, true);
        }
    }

    const cancleButtonHandler = () => {
        setuser("");
        setBorder(document.getElementById("searchUser"), false, true);
        setshowFriends(true);
    }

    return { usernameHandler, setBorder, cancleButtonHandler }
}

export default sidebarHandler