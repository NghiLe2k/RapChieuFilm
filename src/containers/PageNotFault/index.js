import React from "react";
import { Link } from "react-router-dom";

const Pagenotfound = () => (
  <div className="not-found">
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
      style={{ width: "100%", height: "600px" }}
    />
    <Link
      to="/"
      className="link-home"
      style={{ marginLeft: "650px", fontSize: "30px" }}
    >
      Go Home
    </Link>
  </div>
);

export default Pagenotfound;
