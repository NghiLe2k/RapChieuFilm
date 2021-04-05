import {
  ADD_FILM_REQUESET,
  ADD_FILM_SUCCESS,
  ADD_FILM_FAILED,
} from "./constant";
import Axios from "axios";

export const actAddFilmApi = (film) => {
  let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  return (dispatch) => {
    dispatch(actAddFilmRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim",
      method: "POST",
      data: film,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actAddFilmSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddFilmFailed(err));
      });
  };
};

const actAddFilmRequest = () => {
  return {
    type: ADD_FILM_REQUESET,
  };
};

const actAddFilmSuccess = (data) => {
  return {
    type: ADD_FILM_SUCCESS,
    payload: data,
  };
};

const actAddFilmFailed = (err) => {
  return {
    type: ADD_FILM_FAILED,
    payload: err,
  };
};
