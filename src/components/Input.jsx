import React from 'react'

export default function Input({name, type, label, id, value, onChange, error, min}) {
    return (
        <div className="row">
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} value={value} onChange={onChange}  min={min} />
            <p>{error}</p>
        </div>
    )
}
