import {
  LIST_MOVIE_SUCCESS,
  LIST_MOVIE_FAILED,
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_DELETE_FAILED,
} from "./constant";
let initialState = {
  loading: false,
  data: null,
  err: null,
  errorDelete: null,
};
const listMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case LIST_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };

    case LIST_MOVIE_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    case LIST_MOVIE_DELETE_FAILED:
      state.errorDelete = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default listMovieReducer;
