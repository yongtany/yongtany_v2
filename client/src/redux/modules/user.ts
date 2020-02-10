import axios, { AxiosResponse } from 'axios';
import { USER_SERVER } from '../../components/Config';
import { Dispatch } from 'redux';

enum ActionTypes {
  LOGIN_USER = 'auth/LOGIN_USER',
  REGISTER_USER = 'auth/REGISTER_USER',
  AUTH_USER = 'auth/AUTH_USER',
  LOGOUT_USER = 'auth/LOGOUT_USER'
}

interface AuthUserAction {
  type: ActionTypes.AUTH_USER,
  payload: AxiosResponse<any>
}

interface LoginUserAction {
  type: ActionTypes.LOGIN_USER,
  payload: AxiosResponse<any>
}

interface RegisterUserAction {
  type: ActionTypes.REGISTER_USER,
  payload: AxiosResponse<any>;
}

interface LogoutUserAction {
  type: ActionTypes.LOGOUT_USER,
  payload: AxiosResponse<any>;
}

type UserAction = AuthUserAction | LoginUserAction | RegisterUserAction | LogoutUserAction;


export const registerUser = (dataToSubmit: any) => {
  return async (dispatch: Dispatch) => {
    const request = await  axios.post(`${USER_SERVER}/signup`, dataToSubmit);

    return dispatch<RegisterUserAction>({
      type: ActionTypes.REGISTER_USER,
      payload: request.data
    }); 
  }
}

export const authUser = () => {
  return async (dispatch: Dispatch) => {
    const request = await  axios.get(`${USER_SERVER}/auth`);

    return dispatch<AuthUserAction>({
      type: ActionTypes.AUTH_USER,
      payload: request.data
    }); 

  }
}

export const loginUser = (dataToSubmit: any) => {
  return async (dispatch: Dispatch) => {
    const request = await  axios.post(`${USER_SERVER}/signin`, dataToSubmit);

    return dispatch<LoginUserAction>({
      type: ActionTypes.LOGIN_USER,
      payload: request.data
    }); 
  }
}

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    const request = await  axios.get(`${USER_SERVER}/logout`);

    return dispatch<LogoutUserAction>({
      type: ActionTypes.LOGOUT_USER,
      payload: request.data
    }); 
  }
}

const initialState = {};

export default function(state = initialState, action: UserAction){
  switch(action.type){
      case ActionTypes.REGISTER_USER:
          return {...state, register: action.payload }
      case ActionTypes.LOGIN_USER:
          return { ...state, loginSucces: action.payload }
      case ActionTypes.AUTH_USER:
        return {...state, userData: action.payload }
      case ActionTypes.LOGOUT_USER:
          return {...state }
      default:
          return state;
  }
}