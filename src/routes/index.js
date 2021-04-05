import DangChieu from "../containers/HomeTemplate/DangChieu";
import DetailPage from "../containers/HomeTemplate/DetailPage";
import DashboardPage from "../containers/AdminTemplate/DashboardPage";
import UserPage from "../containers/AdminTemplate/UserPage";
// import AuthPage from "../containers/AdminTemplate/AuthPage";
import ListUser from "../containers/AdminTemplate/UserManager";
import FilmManeger from "../containers/AdminTemplate/FilmManager";
import DatVe from "../containers/DatVeTemplate/";
const routesHome = [
  {
    exact: true,
    path: "/",
    component: DangChieu,
  },
  {
    exact: false,
    path: "/detail/:id",
    component: DetailPage,
  },
  {
    exact: false,
    path: "/dangKy",
    component: UserPage,
  },
];
const routesAdmin = [
  // {
  //   exact: false,
  //   path: "/dashboard",
  //   component: DashboardPage,
  // },
  // {
  //   exact: false,
  //   path: "/user",
  //   component: UserPage,
  // },
  {
    exact: false,
    path: "/usermanager",
    component: ListUser,
  },
  {
    exact: false,
    path: "/filmmanager",
    component: FilmManeger,
  },
];
const routesDatVe = [
  {
    exact: false,
    path: "/datve/:id",
    component: DatVe,
  },
];
export { routesHome, routesAdmin, routesDatVe };
