export const baseURL='http://localhost:5000'
const summaryAPI={
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'/api/user/login',
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
}
export default summaryAPI;