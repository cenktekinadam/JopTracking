import React from 'react'
import { useSelector } from 'react-redux'

const AutoInput = ({ label, name }) => {
    const { jobs } = useSelector((store) => store)
    const arr = jobs.map((job) => job[name]);
    const filtredSet = new Set(arr)

    const options = Array.from(filtredSet)
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input list={name} name={name} id={label} type="text" />
            <datalist id={name}>
                {options.map((i) => (<option value={i} />))}


            </datalist>
        </div>
    )
}

export default AutoInput;