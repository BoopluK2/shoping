import { USER_DETALI_FAIL, USER_DETALI_REQUEST, USER_DETALI_RESET, USER_DETALI_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../Constants/UserCons";
import axios from "axios"


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const { data } = await axios.post(`https://shoping-eta.vercel.app/api/users/login`, {email, password}, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });


        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETALI_RESET });
    document.location.href = "/login"
}


export const register = (name,email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const { data } = await axios.post(`https://shoping-eta.vercel.app/api/users`, { name,email, password}, config);

        dispatch({type: USER_REGISTER_SUCCESS,payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})


        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const getUserDetal = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETALI_REQUEST })
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`https://shoping-eta.vercel.app/api/users/${id}`, config);

        dispatch({ type: USER_DETALI_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Не авторизовано, токен не удался") {
            dispatch(logout());
        }
 
        dispatch({
            type: USER_DETALI_FAIL,
            payload: message,
        });
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`https://shoping-eta.vercel.app/api/users/profile`,user, config);

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Не авторизовано, токен не удался") {
            dispatch(logout());
        }
 
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
}