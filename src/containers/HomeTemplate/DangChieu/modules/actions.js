import {
  LIST_MOVIE_SUCCESS,
  LIST_MOVIE_FAILED,
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_DELETE_FAILED,
} from "./constant";
import Axios from "axios";
export const actListMovieApi = () => {
  return (dispatch) => {
    dispatch(actListMovieRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10",
      method: "GET",
    })
      .then((result) => {
        dispatch(actListMovieSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actListMovieFailed(err));
      });
  };
};
export const actMovieListDeleteAPI = (id) => {
  let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  return (dispatch) => {
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        console.log("success");
        window.history.go("/filmmanager");
      })
      .catch((err) => {
        console.log(err);
        dispatch(actMovieListDeleteFailed(err));
      });
  };
};
export const actListMovieRequest = () => {
  return {
    type: LIST_MOVIE_REQUEST,
  };
};
export const actListMovieSuccess = (data) => {
  return {
    type: LIST_MOVIE_SUCCESS,
    payload: data,
  };
};
export const actListMovieFailed = (err) => {
  return {
    type: LIST_MOVIE_FAILED,
    payload: err,
  };
};
export const actMovieListDeleteFailed = (error) => {
  return {
    type: LIST_MOVIE_DELETE_FAILED,
    payload: error,
  };
};
