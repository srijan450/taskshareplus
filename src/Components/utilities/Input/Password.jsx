import React, { useState } from 'react'

const Password = ({ name, lable, value, handler, error, ecolor }) => {
    const [showPassword, setshowPassword] = useState(false)
    const showHidePassword = (e, aname) => {
        document.getElementsByName(aname)[0].type = showPassword ? "password" : "text";
        e.target.classList.toggle('fa-eye-slash')
        e.target.classList.toggle("fa-eye")
        setshowPassword(!showPassword);
    }
    return (
        <>
            <div className="form form-floating d-flex align-items-center">
                <input type="password" className="password form-control" name={name} value={value} onChange={(e) => handler(e)} placeholder="enter password" required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$' title='password should be atleast eight character long password should contain atleast one uppercase letter, atleast one lowercase letter and atleast one number' />
                <span className='showpasswordbutton' onClick={(e) => showHidePassword(e, name)}><i className="fa-solid fa-eye-slash"></i></span>
                <label htmlFor={name}><i className="fa-solid fa-lock"></i> {lable}</label>
            </div>
            <p className={`px-3 text-center text-${ecolor} mb-0 text-wrap`}>&nbsp;{error}</p>
        </>
    )
}

export default Password