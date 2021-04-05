import React, { Component } from 'react';
import './index.scss';
import data from './data.js';
import Axios from 'axios';
class LichPhim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLink: 0,
            BHDStar: [],
            CineStar: [],
            MegaGS: [],
            Galaxy: [],
            LotteCinima: [],
            activeRapLink: 0,
            listToRender: [],
            loadingListMovie: null
        }
    }
    
    componentDidMount() {
        const cumRap = ["BHDStar", "CineStar", "MegaGS", "Galaxy", "LotteCinima"];
        cumRap.forEach((id) => {
            Axios({
                url:
                `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP10`,
                method: "GET",
            })
            .then((res) => {
                this.setState({
                    [id]: res.data,
                })
            })
        })
    }
    handleButton = (id) => {
        this.setState({
            activeLink: id,
            activeRapLink: 0,
        })
    }

    handleHeThongRap = (item, index) => {
        let { danhSachPhim = [] } = item;
        let { maCumRap: rapTen } = item;
        this.setState({
            activeRapLink: index,
            loadingListMovie: true
        }, () => {
            danhSachPhim = danhSachPhim.filter((item) => {
                item.lstLichChieuTheoPhim = item.lstLichChieuTheoPhim.filter((nestedData) => {
                    let now = new Date();
                    // mock date
                    const date = now.getDate();
                    const month = now.getMonth();
                    const year = now.getFullYear();
                    now = now.valueOf();
                    rapTen = rapTen.split('-').join(' ');
                    rapTen = this.toUpperCase(rapTen);
                    rapTen[0].toLowerCase();
                    const moreTime = new Date((nestedData.ngayChieuGioChieu).valueOf() > now);
                    const equalDate = (date == new Date(nestedData.ngayChieuGioChieu).getDate()) && (month == new Date(nestedData.ngayChieuGioChieu).getMonth()) && (year == new Date(nestedData.ngayChieuGioChieu).getFullYear());
                    return moreTime && equalDate;
                })
                return item.lstLichChieuTheoPhim.length > 0;
            })
            this.setState({
                [rapTen]: {...item, danhSachPhim}
            })
        })
    }

    toUpperCase = (str) => {
        const array1 = str.split(' ');
        const newarray1 = [];
            
        array1.forEach((item) => {
            newarray1.push(item.charAt(0).toUpperCase()+item.slice(1));
        })
        return newarray1.join('');
    }

    renderRapLogo = () => {
        const { rap } = data;
        const { activeLink } = this.state;
        return rap.map((item, index) => {
            return (
                <li key={index}>
                    <div className={ (index === activeLink ? "logo active" : "logo") } onClick={() => this.handleButton(index)}>
                        <img src={item.logo} className="logo-img" alt="logo"></img>
                    </div>
                </li>
            )
        })
    }

    renderHeThongRap = (data) => {
        const { activeRapLink } = this.state;
        if (data[0]) {
            const { logo = "", lstCumRap : rap = [] } = data[0];
            return rap.map((item, index) => {
                const tempItem = item.tenCumRap.split('-');
                const coloredLabel = tempItem[0];
                const normalLabel = tempItem[1];
                return (
                    <div className={ (index === activeRapLink ? "row container-lich-phim active1" : "row container-lich-phim")} onClick={() => {this.handleHeThongRap(item, index)}}>
                        <div className="col-3 cursor img">
                            <img src={logo} />
                        </div>
                        <div className="col-9 cursor">
                            <span className="colored-label">{coloredLabel}</span> - <span className="normal-label">{normalLabel}</span>
                            <p className="grey-color">{item.diaChi}</p>
                            <a className="red-color">[chi tiết]</a>
                        </div>
                    </div>
                )
            })
        }
    }

    renderListMovie = () => {
        const { activeLink, activeRapLink } = this.state;
        let listRender = {};
        if (activeLink == 0) {
            switch (activeRapLink) {
                case 0 : {
                    listRender = this.state.BhdStarCineplexPhamHung || {} ;
                    break;
                }
                case 1 : {
                    listRender = this.state.BhdStarCineplexVincomQuangTrung || {} ;
                    break;
                }
                case 2 : {
                    listRender = this.state.BhdStarCineplexVincomThaoDien || {} ;
                    break;
                }
                default: 
                    listRender = this.state.BhdStarCineplex32 || {} ;
                    break;
            }

        } else if (activeLink == 1) {
            switch (activeRapLink) {
                case 0 : {
                    listRender = this.state.CnsQuocThanh || {};
                    break;
                }
                default: 
                    listRender = this.state.CnsHaiBaTrung || {};
                    break;
            }
        } else if (activeLink == 2) {

        } else if (activeLink == 3) {
            listRender = this.state.MegagsCaoThang || {};
        } else if (activeLink == 4) {
            switch (activeRapLink) {
                case 0 : {
                    listRender = this.state.GlxHuynhTanPhat || {};
                    break;
                }
                case 1 : {
                    listRender = this.state.GlxNguyenDu || {};
                    break;
                }
                case 2 : {
                    listRender = this.state.GlxNguyenVanQua || {};
                    break;
                }
                case 3 : {
                    listRender = this.state.GlxQuangTrung || {};
                    break;
                }
                default: 
                    listRender = this.state.GlxTanBinh || {};
                    break;
            }
        } else {
            switch (activeRapLink) {
                case 0 : {
                    listRender = this.state.LotteCantavil || {};
                    break;
                }
                case 1 : {
                    listRender = this.state.LotteCongHoa || {};
                    break;
                }
                case 2 : {
                    listRender = this.state.LotteGoVap || {};
                    break;
                }
                case 3 : {
                    listRender = this.state.LotteNamSaiGon || {};
                    break;
                }
                case 4 : {
                    listRender = this.state.LottePhuTho || {};
                    break;
                }
                default: 
                    listRender = this.state.LotteThuDuc || {};
                    break;
            }
        }
        if (listRender.danhSachPhim && listRender.danhSachPhim.length > 0) {
            return listRender.danhSachPhim.map((item) => {
                let lichChieu = [];
                if (this.state.loadingListMovie) {
                    Axios({
                        method: 'GET',
                        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${item.maPhim}`
                    }).then((res) => {
                        const { data } = res;
                        if (data) {
                            item.thoiLuongPhim = data.lichChieu[0].thoiLuong;
                            item.diemDanhGia = data.danhGia;
                        }
                        this.setState({
                            loadingListMovie: false,
                            listRender
                        })
                    })
                }
                item.lstLichChieuTheoPhim.forEach((nestedData) => {
                    let time = new Date(nestedData.ngayChieuGioChieu).valueOf() + 7200000;
                    time = new Date(time);
                    const hour = time.getHours();
                    const minutes = time.getMinutes();
                    time = `${hour}:${minutes}`
                    const obj = { from : nestedData.ngayChieuGioChieu.split('T')[1].slice(0, 5), to: time };
                    lichChieu.push(obj);
                });
                if (!this.state.loadingListMovie) {
                    return (
                        <div className="row container-lich-phim" key={item.maPhim}>
                            <div className="col-2 cursor img">
                                <img src={item.hinhAnh} />
                            </div>
                            <div className="col-10 cursor">
                                <span className="colored-label">P</span> - <span className="normal-label">{item.tenPhim}</span>
                                <p className="grey-color">{item.thoiLuongPhim} Phút - TIX {item.diemDanhGia}</p>
                            </div>
                            <div className="col-12 text">
                                2D Digital
                            </div>
                            <div className="col-12">
                                {lichChieu.map((nestedData) => {
                                    return (
                                        <button className="time">
                                            <span className="from">{nestedData.from}</span> ~ <span className="to">{nestedData.to}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <button className="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    )
                }
        })
        } else {
            return (
                <div className="Test">
                    Không có suất chiếu
                </div>
            )
        }
    }

    render() {
        const { 
            BHDStar,
            CineStar,
            MegaGS,
            Galaxy,
            LotteCinima,
            activeLink,
            loadingListMovie
        } = this.state;
        let className = "listMovies col-6";
        return (
            <div className="row LichPhim container-lich-phim">
                <div className="row container container-lich-phim">
                    <ul className="nav nav-tabs listPCinemas accordion col-2">
                        {this.renderRapLogo()}
                    </ul>
                    <div className="tab-content float-left col-4">
                        {(BHDStar && activeLink === 0) && (this.renderHeThongRap(BHDStar))}
                        {(CineStar && activeLink === 1) && (this.renderHeThongRap(CineStar))}
                        {(MegaGS && activeLink === 3) && (this.renderHeThongRap(MegaGS))}
                        {(Galaxy && activeLink === 4) && (this.renderHeThongRap(Galaxy))}
                        {(LotteCinima && activeLink === 5) && (this.renderHeThongRap(LotteCinima))}
                    </div>
                    <div className={className}>
                        {this.renderListMovie()}
                    </div>
                </div>
            </div>
        );
    }
}

export default LichPhim;