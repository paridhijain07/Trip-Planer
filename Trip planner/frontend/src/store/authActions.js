// authActions.js
import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
import { loginSuccess } from './authSlice';
import toast from 'react-hot-toast';

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const response = await Axios({
      ...summaryAPI.login,
      data: loginData,
    });

    if (response.data.success) {
      const user = response.data.data.user;
      const accessToken = response.data.data.accessToken;

      dispatch(loginSuccess({ user, accessToken }));

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!');
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Login failed. Please try again.');
    console.error(error);
  }
};
