import React from "react";
import { Route } from "react-router-dom";
import NavbarHome from "../../components/NavbarHome";
import News from "../../components/News";
import Carousel from "../../components/Carousel";
import Ungdung from "../../components/Ungdung";
import LichPhim from "../../components/LichPhim";
function HomeLayout(props) {
  return (
    <div>
      <NavbarHome />
      {/* <Carousel /> */}
      {props.children}
      {/* <LichPhim />
      <News /> */}
      <Ungdung />
    </div>
  );
}

export default function HomeTemplate({ Component, ...props }) {
  return (
    <div>
      <Route
        {...props}
        render={(propsComponent) => (
          <HomeLayout>
            <Component {...propsComponent} />
          </HomeLayout>
        )}
      />
    </div>
  );
}
