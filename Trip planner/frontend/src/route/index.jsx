import React from 'react'
import App from '../App'
import {createBrowserRouter} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerification from '../pages/OtpVerification'
import MapComponent from '../pages/MapComponent'
import Logout from '../pages/Logout'
import ResetPassword from '../pages/ResetPassword'
import TripForm from '../pages/TripForm'
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
            },
            {
                path:'logout',
                element:<Logout></Logout>
            },
            // {
            //     path:'route',
            //     element:<MapComponent></MapComponent>
            // },
            // {
            //     path:'geocode',
            //     element:<MapComponent></MapComponent>
            // },
            {
                path:'reset-password',
                element:<ResetPassword />
            },
            {
                path:'trip-form',
                element:<TripForm />
            }


        ]
    }
])

export default router
