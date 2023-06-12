import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => {
    
    console.log("isLogedIn", isAuthorized)
    return (
        isAuthorized ? (
            <Component {...rest} />
        ) : (
        <Navigate to="/" replace/>
        )
    )
}

export default PrivateRoute;