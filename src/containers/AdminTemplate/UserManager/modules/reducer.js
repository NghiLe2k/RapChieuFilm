import {
  USER_MANAGER_REQUEST,
  USER_MANAGER_SUCCESS,
  USER_MANAGER_FAILED,
  USER_MANAGER_DELETE_FAILED,
} from "./constant";

let initialState = {
  loading: false,
  data: null,
  err: null,
  errorDelete: null,
};

const userManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_MANAGER_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };

    case USER_MANAGER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };

    case USER_MANAGER_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    case USER_MANAGER_DELETE_FAILED:
      state.errorDelete = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default userManagerReducer;
