import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routesHome, routesAdmin, routesDatVe } from "./routes/index";
import HomeTemplate from "./containers/HomeTemplate";
import AdminTemplate from "./containers/AdminTemplate";
// import Pagenotfound from "./../src/containers/PageNotFault/index";
import AuthPage from "./containers/AdminTemplate/AuthPage";
import DatVeTemplate from "./containers/DatVeTemplate";
// import NavbarHome from "./components/NavbarHome";
// import News from "./components/News";
import Pagenotfound from "./containers/PageNotFault";
const showLayoutHome = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomeTemplate
          key={index}
          exact={item.exact}
          path={item.path}
          Component={item.component}
        />
      );
    });
  }
};
const showLayoutAdmin = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <AdminTemplate
          key={index}
          exact={item.exact}
          path={item.path}
          Component={item.component}
        />
      );
    });
  }
};

const showLayoutDatVe = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <Route exact={item.exact} path={item.path} component={item.component} />
      );
    });
  }
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {showLayoutHome(routesHome)}
          {showLayoutAdmin(routesAdmin)}
          {showLayoutDatVe(routesDatVe)}
          <Route exact={false} path="/auth" component={AuthPage} />
          <Route path="" component={Pagenotfound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
