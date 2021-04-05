import {
  USER_MANAGER_REQUEST,
  USER_MANAGER_SUCCESS,
  USER_MANAGER_FAILED,
  USER_MANAGER_DELETE_FAILED,
} from "../modules/constant";
import Axios from "axios";

export const actUserManagerApi = () => {
  return (dispatch) => {
    dispatch(actUserManagerRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
      method: "GET",
    })
      .then((result) => {
        dispatch(actUserManagerSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actUserManagerFailed(err));
      });
  };
};
export const actUserListDeleteAPI = (id) => {
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
        window.history.go("/usermanager");
      })
      .catch((err) => {
        console.log(err);
        dispatch(actUserListDeleteFailed(err));
      });
  };
};
const actUserManagerRequest = () => {
  return {
    type: USER_MANAGER_REQUEST,
  };
};

const actUserManagerSuccess = (data) => {
  return {
    type: USER_MANAGER_SUCCESS,
    payload: data,
  };
};

const actUserManagerFailed = (err) => {
  return {
    type: USER_MANAGER_FAILED,
    payload: err,
  };
};
export const actUserListDeleteFailed = (error) => {
  return {
    type: USER_MANAGER_DELETE_FAILED,
    payload: error,
  };
};
