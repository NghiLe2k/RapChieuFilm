import {
    LIST_CUM_RAP_SUCCESS,
    LIST_CUM_RAP_REQUEST,
    LIST_CUM_RAP_FAIL,
} from "./constant";
import Axios from "axios";

export const actListCumRapApi = (id) => {
    return (dispatch) => {
      dispatch(actListCumRapRequest(id));
      Axios({
        url:
          `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`,
        method: "GET",
      })
        .then((result) => {
          dispatch(actListCumRapSuccess(result.data));
        })
        .catch((err) => {
          dispatch(actListCumRapFailed(err));
        });
    };
  };
  export const actListCumRapRequest = (id) => {
    return {
      type: LIST_CUM_RAP_REQUEST,
    };
  };
  export const actListCumRapSuccess = (data) => {
    return {
      type: LIST_CUM_RAP_SUCCESS,
      payload: data,
    };
  };
  export const actListCumRapFailed = (err) => {
    return {
      type: LIST_CUM_RAP_FAIL,
      payload: err,
    };
  };