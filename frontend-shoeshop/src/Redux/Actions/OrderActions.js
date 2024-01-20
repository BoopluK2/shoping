import axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../Constants/OrderCons";
import { CART_CLEAR_ITEMS } from "../Constants/CartCons";
import { logout } from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`https://shoping-eta.vercel.app/api/orders`,order, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({type: CART_CLEAR_ITEMS,payload: data});
        localStorage.removeItem("cartItems");

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Не авторизовано, токен не удался") {
            dispatch(logout());
        }
 
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        });
    }
}


export const detailsOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`https://shoping-eta.vercel.app/api/orders/${id}`, config);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Не авторизовано, токен не удался") {
            dispatch(logout());
        }
 
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
}

