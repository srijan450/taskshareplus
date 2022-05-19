import React from 'react'

const Input = ({ type, name, label, placeholder, icon, value, handler, error, ecolor, pattern, title }) => {
    return (

        <div className="form form-floating">
            <input type={type} className="form-control control" name={name} value={value} placeholder={placeholder} required onChange={(e) => handler(e)} style={{}} pattern={pattern} title={title} />
            <label htmlFor={name}><i className={`fa-solid ${icon}`}></i> {label}</label>
            <p className={`px-3 text-center text-${ecolor} mb-1 text-wrap`}>&nbsp;{error}</p>
        </div >
    )
}

export default Input