import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "./constants";
import Axios from "axios";
import { message } from "antd";

export const actUserListUpdateAPI = (account) => {
  let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  return (dispatch) => {
    dispatch(actUserListUpdateRequest());
    Axios({
      url:
        "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: account,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        contentType: 'application/json'
      },
    })
      .then((result) => {
        // dispatch(actUserListUpdateSuccess(result.data));
        console.log("okay");
        window.history.go("/dashboard/user");
      })
      .catch((err) => {
        // dispatch(actUserListUpdateFailed(err));
        console.log(err.response.data);
        message.error({ content: "Không thể cập nhật người dùng " });
      });
  };
};

export const actUserListUpdateRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};
export const actUserListUpdateSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};
export const actUserListUpdateFailed = (err) => {
  return {
    type: UPDATE_USER_FAILED,
    payload: err,
  };
};
