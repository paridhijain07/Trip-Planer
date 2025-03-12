import React from 'react'
import App from '../App'
import {createBrowserRouter} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerification from '../pages/OtpVerification'
const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {
                path:'',
                element:<LandingPage></LandingPage>
            },
            {
                path:'login',
                element:<Login></Login>
            },
            {
                path:'register',
                element:<Register></Register>       
            },
            {
                path:'forgot-password',
                element:<ForgotPassword></ForgotPassword>
            },
            {
                path:'verify-forgot-password',
                element:<OtpVerification></OtpVerification>
            }
        ]
    }
])

export default router
