import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateReviewReducer, productDetailsReducer, productListReducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { userDetaliReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/UserReducers";
import { orderCreateReducer, orderDetailsReducer } from "./Reducers/OrderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetal: userDetaliReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    productReviewCreate: productCreateReviewReducer
});

const cartItemsFromLocal = localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem("cartItems")) : []

const userInfoFromLocal = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null;
    
const shippingAddressFromLocal = localStorage.getItem("shippingAddress") ?
JSON.parse(localStorage.getItem("shippingAddress")) : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromLocal,
        shippingAddress: shippingAddressFromLocal,
    },
    userLogin: {
        userInfo : userInfoFromLocal
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
