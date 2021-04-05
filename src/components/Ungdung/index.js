import React, { Component } from "react";
import "./../../index.css";
import img from "../../assets/img/slide6.jpg";
import "./index.scss";
class Ungdung extends Component {
  render() {
    return (
      <div className="row ungdung-container" id="ungDung">
        <div className="ungdung">
          <div className="main">
            <div className="row">
              <div className="col-md-6 left text-left">
                <p className="textLeft">Ứng dụng tiện lợi dành cho</p>
                <p className="textLeft">người yêu điện ảnh</p>
                <br />
                <p className="textSmallLeft">
                  Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                  và đổi quà hấp dẫn.
                </p>
                <br />
                <button
                  className="buttonLeft"
                  onClick={() =>
                    window.open(
                      "https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8",
                      "_blank"
                    )
                  }
                >
                  App miễn phí - Tải về ngay!
                </button>
                <p className="textAppUnder">
                  TIX có hai phiên bản{" "}
                  <a
                    className="tagA"
                    target="_blank"
                    href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8"
                  >
                    iOS{" "}
                  </a>
                  &amp;&nbsp;
                  <a
                    className="tagA"
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                  >
                    Android
                  </a>
                </p>
              </div>
              <div className="col-md-6 right">
                <img
                  className="img-responsive phone-img"
                  src="https://tix.vn/app/assets/img/icons/mobile.png"
                  alt="Loading..."
                >
                  {/* <img class="nested-img" src={img} /> */}
                </img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ungdung;
