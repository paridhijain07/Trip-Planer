export const baseURL='http://localhost:3000'
const summaryAPI={
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'/api/user/login',
        method:'post'
    },
    logout:{
        url:'/api/user/logout',
        method:'post'
    },
    forgotPassword:{
        url:'/api/user/forgot-password',
        method:'put'
    },
    verifyOtp:{
        url:'/api/user/verify-forgot-password',
        method:'put'
    },
    refreshToken:{
        url:'/api/user/refresh-token',
        method:'post'
    },
    route:{
        url:'/api/trip/route',
        method:'post'
    },
    geocode:{
        url:'/api/trip/geocode',
        method:'get'
    }
}
export default summaryAPI;