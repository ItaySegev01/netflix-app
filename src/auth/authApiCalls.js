import axios from 'axios';
import { LoginStart, LoginSuccess, LoginFail } from './authActions';
import {toast} from 'react-toastify';

export const loginCall = async (userCred, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(
      '/auth/login',
      userCred
    );
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail());
  } catch (error) {
    toast.dark('Invalid Password/User');
    dispatch(LoginFail());
  }
};

export const registerCall = async (newUser, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(
      '/auth/register',
      newUser
    );
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail());
  } catch (error) {
    toast.dark('something went wrong ...');
    dispatch(LoginFail());
  }
};
