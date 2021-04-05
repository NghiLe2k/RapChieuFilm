import {
  DETAIL_PAGE_REQUEST,
  DETAIL_PAGE_SUCCESS,
  DETAIL_PAGE_FAILED,
} from "./constain";

let initialState = {
  loading: false,
  data: null,
  err: null,
};

const detailPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_PAGE_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };

    case DETAIL_PAGE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };

    case DETAIL_PAGE_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default detailPageReducer;
