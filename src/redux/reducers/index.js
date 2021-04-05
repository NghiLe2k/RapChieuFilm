import listMovieReducer from "./../../containers/HomeTemplate/DangChieu/modules/reducer";
import listMovieScheduleReducer from "./../../containers/HomeTemplate/TheoNgay/modules/reducer";
import listHeThongRapReducer from "./../../containers/HomeTemplate/ThongTinRap/modules/reducer";
import detailPageReducer from "./../../containers/HomeTemplate/DetailPage/modules/reducer";
import authReducer from "./../../containers/AdminTemplate/AuthPage/modules/reducer";
import addUserReducer from "./../../containers/AdminTemplate/UserPage/modules/reducer";
import userManagerReducer from "./../../containers/AdminTemplate/UserManager/modules/reducer";
// import deleteUserReducer from "./../../containers/AdminTemplate/DeleteUser/modules/reducer";
import addFilmReducer from "./../../containers/AdminTemplate/AddFilm/modules/reducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  listMovieReducer,
  listMovieScheduleReducer,
  listHeThongRapReducer,
  detailPageReducer,
  authReducer,
  addUserReducer,
  userManagerReducer,
  // deleteUserReducer,
  addFilmReducer,
});
export default rootReducer;
