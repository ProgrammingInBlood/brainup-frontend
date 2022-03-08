import axios from "axios";
import * as actionTypes from "../constants/Authentication";
import jwt_decode from "jwt-decode";
import { firebaseCloudMessaging } from "../../firebase-messaging-service/webPush";
import localforage from "localforage";

const decodeJwt = async (token) => {
  try {
    const decoded = await jwt_decode(token);
    return decoded;
  } catch (err) {
    return err;
  }
};

export const login = (email, password, provider, token) => async (dispatch) => {
  switch (provider) {
    case "credentials":
      try {
        dispatch({ type: actionTypes.LOGIN_REQUEST });
        await axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/credentials`, {
            email,
            password,
          })
          .then(async (res) => {
            if (res.data.success) {
              let FMCtoken = await firebaseCloudMessaging.init();
              console.log({ FMCtoken });

              if (FMCtoken) {
                await axios.post(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/fcm-token`,
                  {
                    token: FMCtoken,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${res.data.token}`,
                    },
                  }
                );
              }
              dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: await decodeJwt(res.data.token),
              });
              localStorage.setItem("token", res.data.token);
            } else {
              dispatch({
                type: actionTypes.LOGIN_FAIL,
                payload: res.data.message,
              });
            }
          });
      } catch (err) {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          payload:
            err.response && err.response.data.message
              ? error.response.data.message
              : err.message,
        });
      }
      break;
    case "custom":
      try {
        dispatch({ type: actionTypes.LOGIN_REQUEST });

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: await decodeJwt(token),
        });
        localStorage.setItem("token", token);
      } catch (err) {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          payload:
            err.response && err.response.data.message
              ? error.response.data.message
              : err.message,
        });
      }
      break;
  }
};

//verify otp and token
export const verifyOtp = (otp, token) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.VERIFY_OTP_REQUEST });
    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/createuser/verify`, {
        otp,
        token,
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: actionTypes.VERIFY_OTP_SUCCESS, payload: data });
        } else {
          dispatch({ type: actionTypes.VERIFY_OTP_FAIL, payload: data });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.VERIFY_OTP_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

//
export const logout = () => async (dispatch) => {
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(async () => {
      dispatch({ type: actionTypes.LOGOUT });
      localStorage.removeItem("token");
    });
};

//
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/createuser`,
      {
        name,
        email,
        password,
      }
    );
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};
//
// export const resetPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });
//     const { data } = await axios.post("/api/auth/reset-password", { email });
//     dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: data });
//   } catch (err) {
//     dispatch({
//       type: actionTypes.RESET_PASSWORD_FAIL,
//       payload:
//         err.response && err.response.data.message
//           ? error.response.data.message
//           : err.message,
//     });
//   }
// };
//
// export const resetPasswordConfirm = (password, token) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.RESET_PASSWORD_CONFIRM_REQUEST });
//     const { data } = await axios.post(
//       "/api/auth/reset-password-confirm",
//       { password, token }
//     );
//     dispatch({ type: actionTypes.RESET_PASSWORD_CONFIRM_SUCCESS, payload: data });
//   } catch (err) {
//     dispatch({
//       type: actionTypes.RESET_PASSWORD_CONFIRM_FAIL,
//       payload:
//         err.response && err.response.data.message
//           ? error.response.data.message
//           : err.message,
//     });
//   }
// };
//
// export const getUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.GET_USER_REQUEST });
//     const { data } = await axios.get("/api/auth/user");
//     dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: data });
//   } catch (err) {
//     dispatch({
//       type: actionTypes.GET_USER_FAIL,
//       payload:
//         err.response && err.response.data.message
//           ? error.response.data.message
//           : err.message,
//     });
//   }
// };
//
// export const updateUser = (name, email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.UPDATE_USER_REQUEST });
//     const { data } = await axios.put("/api/auth/user", {
//       name,
//       email,
//       password,
//     });
//     dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, payload: data });
//   } catch (err) {
//     dispatch({
//       type: actionTypes.UPDATE_USER_FAIL,
//       payload:
//         err.response && err.response.data.message
//           ? error.response.data.message
//           : err.message,
//     });
//   }

// Language: javascript
// Path: redux\actions\authActions.js

//get user
