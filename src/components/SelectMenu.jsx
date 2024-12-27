import React from 'react'

export default function SelectMenu({ options, value, label, defaultOption, onChange, name, id, error }) {
    return (
        <div className="row">
            <label htmlFor={id}>{label}</label>
            <select name={name} id={id} value={value} onChange={onChange}>
                <option value="" hidden>
                    {defaultOption}
                </option>
                {
                    options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)
                }
            </select>
            <p>{error}</p>
        </div>
    )
}
