import {
    LIST_MOVIE_SCHEDULE_SUCCESS,
    LIST_MOVIE_SCHEDULE_FAILED,
    LIST_MOVIE_SCHEDULE_REQUEST,
} from "./constant";
import Axios from "axios";

export const actListMovieScheduleApi = () => {
    let fromDate = new Date();
    let toDate = new Date();
    toDate.setDate(toDate.getDate() +6);
    const dd = String(fromDate.getDate()).padStart(2, '0');
    const mm = String(fromDate.getMonth() + 1).padStart(2, '0');
    const yyyy = fromDate.getFullYear();
  
    const dd1 = String(toDate.getDate()).padStart(2, '0');
    const mm1 = String(toDate.getMonth() + 1).padStart(2, '0');
    const yyyy1 = toDate.getFullYear();
    fromDate = dd + '/' + mm + '/' + yyyy;
    toDate = dd1 + '/' + mm1 + '/' + yyyy1;
    return (dispatch) => {
      dispatch(actListMovieScheduleRequest());
      Axios({
        url:
          `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=GP10&soTrang=1&soPhanTuTrenTrang=10&tuNgay=${fromDate}&denNgay=${toDate}`,
        method: "GET",
      })
        .then((result) => {
          dispatch(actListMovieScheduleSuccess(result.data));
        })
        .catch((err) => {
          dispatch(actListMovieScheduleFailed(err));
        });
    };
  };
  export const actListMovieScheduleRequest = () => {
    return {
      type: LIST_MOVIE_SCHEDULE_REQUEST,
    };
  };
  export const actListMovieScheduleSuccess = (data) => {
    return {
      type: LIST_MOVIE_SCHEDULE_SUCCESS,
      payload: data,
    };
  };
  export const actListMovieScheduleFailed = (err) => {
    return {
      type: LIST_MOVIE_SCHEDULE_FAILED,
      payload: err,
    };
  };