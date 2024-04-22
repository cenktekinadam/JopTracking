import React from 'react'

const Select = ({ label, options, handleChange, name }) => {
    return (
        <div>
            <label >{label}</label>
            <select name={name} onChange={handleChange}>
                <option hidden value="">Seçiniz</option>
                {options.map((i) => (<option key={i} value={i}>{i}</option>))}
            </select>
        </div>
    )
}

export default Select