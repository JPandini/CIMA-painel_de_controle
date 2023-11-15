import React from 'react'
import { Route, Navigate } from 'react-router'
import { isLogged } from '../../utils/auth'

const PublicRoute = props => isLogged()
    ? <Navigate to="/"/>
    : <Route {...props}/>

export default PublicRoute