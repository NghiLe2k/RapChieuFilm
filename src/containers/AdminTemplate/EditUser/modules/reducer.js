import {
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILED,
} from "./constants";

let initialState = {
  loading: true,
  data: null,
  err: null,
};
const updateAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case UPDATE_ACCOUNT_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case UPDATE_ACCOUNT_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default updateAccountReducer;
