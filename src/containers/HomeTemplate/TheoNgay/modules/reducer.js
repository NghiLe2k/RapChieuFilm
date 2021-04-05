import {
    LIST_MOVIE_SCHEDULE_SUCCESS,
    LIST_MOVIE_SCHEDULE_FAILED,
    LIST_MOVIE_SCHEDULE_REQUEST,
} from "./constant";
  let initialState = {
    loading: false,
    data: null,
    err: null,
  };
  const listMovieScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
      case LIST_MOVIE_SCHEDULE_REQUEST:
        state.loading = true;
        state.data = null;
        state.err = null;
        return { ...state };
      case LIST_MOVIE_SCHEDULE_SUCCESS:
        state.loading = false;
        state.data = action.payload;
        state.err = null;
        return { ...state };
  
      case LIST_MOVIE_SCHEDULE_FAILED:
        state.loading = false;
        state.data = null;
        state.err = action.payload;
        return { ...state };
  
      default:
        return { ...state };
    }
  };
  
  export default listMovieScheduleReducer;
  