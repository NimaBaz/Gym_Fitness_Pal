import axios from "axios"
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'

const Login = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email:"",
        password:"",
    })
    
    const [errors, setErrors] = useState([]);
    const [loggedInUserID, setLoggedInUserID] = useLocalStorage("userID", null);

    const changeHandler =(e) =>{
        let {name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/login`, user, {withCredentials:true})
            .then(response => {
                console.log("Login POST request", response.data)
                setLoggedInUserID(response.data.user._id)
                navigate("/dashboard")
            })
            .catch(err => {
                console.log("Login error", err.response.data);
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
        <div className="login">
            {errors.map((err, index) => <p key={index} className="tabs">{err}</p>)}
            <section className="text-center text-lg-start">
            <div className="card mb-3">
                <div className="row g-0 d-flex align-items-center">
                    <div className="form">
                        <div className="card-body py-5 px-md-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="email" value={user.email} onChange={changeHandler}/>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Password</label>
                                    <input className="form-control" type="password" name="password" value={user.password} onChange={changeHandler} />
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <Link to={"/register"}>Don't have an account?</Link>
                                    </div>
                                </div>
                                <button value="Login" type="submit" className='logout-button'>Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Login


// {login ? (
//     <p className="text-success">You Are Logged in Successfully</p>
// ) : (
//     <p className="text-danger">You Are Not Logged in</p>
// )}