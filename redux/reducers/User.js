import {
  UPDATE_USER_DESCRIPTION_REQUEST,
  UPDATE_USER_DESCRIPTION_SUCCESS,
  UPDATE_USER_DESCRIPTION_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_QUESTION_BY_ID_REQUEST,
  GET_QUESTION_BY_ID_SUCCESS,
  GET_QUESTION_BY_ID_FAIL,
  GET_ANSWER_BY_ID_REQUEST,
  GET_ANSWER_BY_ID_SUCCESS,
  GET_ANSWER_BY_ID_FAIL,
} from "../constants/User";

//description reducer
const initialState = {
  loading: false,
  error: null,
  data: {},
  conversations: [],
  messages: [],
  question: null,
  answer: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_USER_DESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_AVATAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CONVERSATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        conversations: action.payload,
      };
    case GET_CONVERSATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        messages: action.payload,
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_USER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_QUESTION_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        question: action.payload,
      };
    case GET_QUESTION_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ANSWER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ANSWER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        answer: action.payload,
      };
    case GET_ANSWER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
