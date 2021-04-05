import {
  ADD_USER_REQUESET,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
} from "./constant";
import Axios from "axios";

export const actAddUserApi = (user) => {
  let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  return (dispatch) => {
    dispatch(actAddUserRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actAddUserSuccess(result.data));
        window.history.go("/usermanager");
      })
      .catch((err) => {
        dispatch(actAddUserFailed(err));
      });
  };
};

const actAddUserRequest = () => {
  return {
    type: ADD_USER_REQUESET,
  };
};

const actAddUserSuccess = (data) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: data,
  };
};

const actAddUserFailed = (err) => {
  return {
    type: ADD_USER_FAILED,
    payload: err,
  };
};
