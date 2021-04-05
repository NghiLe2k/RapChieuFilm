import {
  AUTH_PAGE_REQUEST,
  AUTH_PAGE_SUCCESS,
  AUTH_PAGE_FAILED,
} from "./constant";
import Axios from "axios";
import NavbarHome from "./../../../../components/NavbarHome";
export const actLoginApi = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: user,
    })
      .then((result) => {
        dispatch(actLoginSuccess(result.data));
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          //Lưu trạng thái login
          localStorage.setItem("UserAdmin", JSON.stringify(result.data));
          //Chuyển đến trang dashboard
          history.push("/usermanager");
        } else if (result.data.maLoaiNguoiDung === "khachHang") {
          localStorage.setItem("KhachHang", JSON.stringify(result.data));
          history.push("/");
        } else {
          history.push("/");
          <NavbarHome taiKhoan="result.data.taiKhoan" />;

          // alert("K co quyen truy cap");
        }
      })
      .catch((err) => {
        dispatch(actLoginFailed(err));
      });
  };
};

const actLoginRequest = () => {
  return {
    type: AUTH_PAGE_REQUEST,
  };
};

const actLoginSuccess = (data) => {
  return {
    type: AUTH_PAGE_SUCCESS,
    payload: data,
  };
};

const actLoginFailed = (err) => {
  return {
    type: AUTH_PAGE_FAILED,
    payload: err,
  };
};
