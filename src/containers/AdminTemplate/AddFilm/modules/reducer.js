import {
  ADD_FILM_REQUESET,
  ADD_FILM_SUCCESS,
  ADD_FILM_FAILED,
} from "./constant";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

const addFilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILM_REQUESET:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ADD_FILM_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ADD_FILM_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default addFilmReducer;
