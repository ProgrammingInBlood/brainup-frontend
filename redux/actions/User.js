import axios from "axios";
import * as actionTypes from "../constants/User";
// get user details
export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_DETAILS_REQUEST });
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/myself`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.GET_USER_DETAILS_SUCCESS,
            payload: res.data.user,
          });
        } else {
          dispatch({
            type: actionTypes.GET_USER_DETAILS_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//update user description
export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_USER_DESCRIPTION_REQUEST });
    await axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.UPDATE_USER_DESCRIPTION_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_USER_DESCRIPTION_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.UPDATE_USER_DESCRIPTION_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

//update avatar
export const updateAvatar = (avatar) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_AVATAR_REQUEST });

    const formData = new FormData();
    formData.append("avatar", avatar);

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.UPDATE_AVATAR_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_AVATAR_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.UPDATE_AVATAR_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

//get conversations
export const getConversations = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CONVERSATIONS_REQUEST });
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.GET_CONVERSATIONS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_CONVERSATIONS_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_CONVERSATIONS_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

//get messages by id
export const getMessages = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_MESSAGES_REQUEST });
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.GET_MESSAGES_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: actionTypes.GET_MESSAGES_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_MESSAGES_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

//get user by id
export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_BY_ID_REQUEST });
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.GET_USER_BY_ID_SUCCESS,
            payload: res.data.user,
          });
        } else {
          dispatch({
            type: actionTypes.GET_USER_BY_ID_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_USER_BY_ID_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

export const getQuestionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_QUESTION_BY_ID_REQUEST });
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.GET_QUESTION_BY_ID_SUCCESS,
            payload: res.data.question,
          });
        } else {
          dispatch({
            type: actionTypes.GET_QUESTION_BY_ID_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_QUESTION_BY_ID_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};

export const getAnswerById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ANSWER_BY_ID_REQUEST });
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/answer/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.GET_ANSWER_BY_ID_SUCCESS,
            payload: res.data.answers,
          });
        } else {
          dispatch({
            type: actionTypes.GET_ANSWER_BY_ID_FAIL,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_ANSWER_BY_ID_FAIL,
      payload:
        err.response && err.response.data.message
          ? error.response.data.message
          : err.message,
    });
  }
};
