import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

export const getProductsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: actionTypes.GET_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_DETAILS_RESET,
  });
};
