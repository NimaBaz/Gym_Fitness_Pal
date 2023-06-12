import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [errors, setErrors] = useState([]);

    const changeHandler = (e) => {
        let {name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/register`, user, {withCredentials:true})
            .then(res => {
                console.log(res.data);
                navigate("/dashboard")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key in errorResponse) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
            console.log("This is called Asynchronous code")
    }


    return (
        <div className='registration'>
            <section className="text-center text-lg-start">
            <div className="card mb-3">
                <div className="errors">
                    {errors.map((err, index) => <p key={index} className="tabs">{err}</p>)}
                </div>
                <div className="row g-0 d-flex align-items-center">
                    <div className="form">
                        <div className="card-body py-5 px-md-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-outline mb-4">
                                    <label className="form-label">First Name</label>
                                    <input className="form-control" type="text" name="firstName" value={user.firstName} onChange={changeHandler} />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Last Name</label>
                                    <input className="form-control" type="text" name="lastName" value={user.lastName} onChange={changeHandler} />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" type="text" name="email" value={user.email} onChange={changeHandler} />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Password</label>
                                    <input className="form-control" type="password" name="password" value={user.password} onChange={changeHandler} />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Confirm Password</label>
                                    <input className="form-control" type="password" name="confirmPassword" value={user.confirmPassword} onChange={changeHandler} />
                                </div>
                                <button className='logout-button'> Sign Up </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Register