import React from "react";
import "./../../index.css";
export default function News() {
  return (
    <div className="container news " id="news" style={{ marginBottom: "30px" }}>
      <div className="col-xl-12 ">
        <ul className="d-flex news__title">
          <li>
            <a className="nav-link news__dienanh" href="#">
              Điện Ảnh 24h
            </a>
          </li>
          <li>
            <a className="nav-link news__review" href="https://khenphim.com/">
              Review
            </a>
          </li>
          <li>
            <a className="nav-link news__review" href="#">
              Khuyến Mãi
            </a>
          </li>
        </ul>
      </div>
      <div className="row news__items ">
        <div className="col-xl-6 news__item">
          <div className="news__item__img">
            <img src="https://vnn-imgs-f.vgcloud.vn/2021/01/21/14/hot-girl-hai-tu-ban-dien-cua-son-tung-la-ai-5.jpg"></img>
          </div>

          <h5>
            <a href="https://vietnamnet.vn/vn/giai-tri/the-gioi-sao/hot-girl-hai-tu-ban-dien-cua-son-tung-la-ai-707232.html">
              Hải Tú - bạn diễn của Sơn Tùng M-TP là ai?
            </a>
          </h5>
          <p>
            Hải Tú hiện là nữ diễn viên độc quyền của công ty Sơn Tùng M-TP. Khi
            ồn ào tình cảm giữa nam ca sĩ và Thiều Bảo Trâm đang được truyền
            thông nhắc nhiều thì cái tên của Hải Tú liên tục được nhắc đến.
          </p>
        </div>
        <div className="col-xl-6 news__item">
          <div className="news__item__img">
            <img src="https://vnn-imgs-a1.vgcloud.vn/znews-photo.zadn.vn/Uploaded/opluoaa/2021_01_21/1377523_694845610560793_1263642427_n.jpg"></img>
          </div>
          <h5>
            <a href="https://vietnamnet.vn/vn/giai-tri/truyen-hinh/ai-se-dong-thien-loi-trong-tao-quan-2021-707360.html">
              Ai sẽ đóng Thiên Lôi trong Táo Quân 2021?
            </a>
          </h5>
          <p>
            Thiên Lôi là nhân vật từng được nhiều nghệ sĩ đảm nhận như Minh
            Quân, Tuấn Hưng, Tiến Minh, Bình Minh.
          </p>
        </div>
        <div className="col-xl-4 news__item__child">
          <div className="news__item__img__child">
            <img src="https://vnn-imgs-f.vgcloud.vn/2021/01/21/14/trinh-sang-bi-cam-song-hoan-toan-lo-ghi-am-noi-tu-biet-khan-gia.JPEG"></img>
          </div>
          <h5>
            <a href="https://vietnamnet.vn/vn/giai-tri/the-gioi-sao/trinh-sang-bi-cam-song-hoan-toan-lo-ghi-am-noi-tu-biet-khan-gia-707247.html">
              Trịnh Sảng bị cấm sóng hoàn toàn, lộ ghi âm từ biệt khán giả
            </a>
          </h5>
          <p>
            Tổng cục Quảng bá Phát thanh và Truyền hình Quốc gia Trung Quốc
            tuyên bố chính thức cấm sóng Trịnh Sảng hoàn toàn trên mọi phương
            tiện
          </p>
        </div>
        <div className="col-xl-4 news__item">
          <div className="news__item__img__child">
            <img src="https://vnn-imgs-f.vgcloud.vn/2021/01/20/23/06-nt.jpg"></img>
          </div>
          <h5>
            <a href="https://vietnamnet.vn/vn/giai-tri/thoi-trang/ngoc-thao-dai-dien-viet-nam-du-thi-miss-grand-international-707099.html">
              Ngọc Thảo đại diện Việt Nam dự thi Miss Grand International
            </a>
          </h5>
          <p>
            Á hậu Ngọc Thảo chính thức trở thành gương mặt đại diện Việt Nam tại
            đấu trường Miss Grand International 2020 sau 2 tháng đoạt giải.
          </p>
        </div>
        <div className="col-xl-4 ">
          <div className="news__item__small d-flex">
            <div className="news__item__small__img">
              <img src="https://vnn-imgs-f.vgcloud.vn/2021/01/20/20/khoanh-khac-hanh-phuc-cua-viet-huong-ben-ong-xa-va-con-gai-150x100.jpg"></img>
            </div>
            <h5 className="news__title_small">
              <a href="https://vietnamnet.vn/vn/giai-tri/the-gioi-sao/sao-viet-hom-nay-21-1-viet-huong-ben-ong-xa-va-con-gai-706964.html">
                Khoảnh khắc hạnh phúc của Việt Hương bên ông xã và con gái
              </a>
            </h5>
          </div>
          <div className="news__item__small d-flex">
            <div className="news__item__small__img">
              <img src="https://znews-photo.zadn.vn/w480/Uploaded/unvjuas/2021_01_21/nats_getty_gigi_gorgeous_16x9_1.jpg"></img>
            </div>
            <h5 className="news__title_small">
              <a href="https://vietnamnet.vn/vn/giai-tri/the-gioi-sao/khiem-khuyet-duy-nhat-cua-dao-dien-tat-binh-la-qua-yeu-vo-707000.html">
                'Khiếm khuyết duy nhất của đạo diễn Tất Bình là yêu NSND
              </a>
            </h5>
          </div>
          <div className="news__item__small d-flex">
            <div className="news__item__small__img">
              <img src="https://znews-photo.zadn.vn/w360/Uploaded/wpdhnwhnw/2021_01_20/lan.jpg"></img>
            </div>
            <h5 className="news__title_small">
              <a href="https://vietnamnet.vn/vn/giai-tri/truyen-hinh/nghe-si-minh-nhi-ke-ve-bien-co-bi-cam-dien-phai-cat-bot-nha-ban-di-707240.html">
                Nghệ sĩ Minh Nhí: Có lúc tôi không có nổi 50 nghìn trong túi!
              </a>
            </h5>
          </div>
          <div className="news__item__small d-flex">
            <div className="news__item__small__img">
              <img src="https://vnn-imgs-f.vgcloud.vn/2021/01/21/19/sh-4-140x93.jpg"></img>
            </div>
            <h5 className="news__title_small">
              <a href="https://vietnamnet.vn/vn/giai-tri/the-gioi-sao/moi-than-tinh-dac-biet-giua-song-hye-kyo-va-huynh-hieu-minh-707337.html">
                Mối thân tình đặc biệt giữa Song Hye Kyo và Huỳnh Hiểu Minh
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
