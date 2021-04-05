import {
  DETAIL_PAGE_REQUEST,
  DETAIL_PAGE_SUCCESS,
  DETAIL_PAGE_FAILED,
} from "./constain";
import Axios from "axios";

export const actDetailPageApi = (id) => {
  return (dispatch) => {
    dispatch(actDetailPageRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      method: "GET",
    })
      .then((result) => {
        dispatch(actDetailPageSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actDeatailPageFailed(err));
      });
  };
};

const actDetailPageRequest = () => {
  return {
    type: DETAIL_PAGE_REQUEST,
  };
};

const actDetailPageSuccess = (data) => {
  return {
    type: DETAIL_PAGE_SUCCESS,
    payload: data,
  };
};

const actDeatailPageFailed = (err) => {
  return {
    type: DETAIL_PAGE_FAILED,
    payload: err,
  };
};
