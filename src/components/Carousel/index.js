import React, { Component } from 'react';
import "./../../index.css";
import './index.scss';
import { connect } from "react-redux";
import Axios from 'axios';
import _ from 'lodash';
import Select from 'react-select';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import { Link } from "react-router-dom";
import { Alert } from '@material-ui/lab';
class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rapOptions: [],
            ngayXemOptions: [],
            suatChieuOptions: [],
            phim: 0,
            rap: '',
            ngayXem: '',
            suatChieu: '',
            isOpenErrMsg: false,
            isLoadingRap: false,
            isLoadingNgayXem: false,
        }
        this.select = {
            rap: React.createRef(),
            ngayXem: React.createRef(),
            suatChieu: React.createRef(),
            phim: React.createRef(),
        }
    }
    
    setErrorMsgStatus = (bool) => {
        if (bool == true) {
            this.setState({
                isOpenErrMsg: true
            })
        } else {
            this.setState({
                isOpenErrMsg: false
            })
        }
    }

    setLoading = (item, bool) => {
        if (bool == true) {
            this.setState({
                [item]: true
            })
        } else {
            this.setState({
                [item]: false
            }, () => {
                let { rap, ngayXem } = this.select;
                rap = rap.current.select;
                ngayXem = ngayXem.current.select;
                item === 'isLoadingRap' ? rap.focus() : ngayXem.focus()
            })
        }
    }
    handleClick = () => {
        const { maLichChieu } = this.state;
        this.handleValidation();
        setTimeout(() => { 
            const { errMsg } = this.state;
            if (errMsg) {
                this.setErrorMsgStatus(true)
            } else
            return;
        }, 500)
    }

    handleValidation = () => {
        const { phim, rap, ngayXem, suatChieu } = this.state;
        const { authReducer } = this.props;
        let errMsg = '';
        if(!phim) {
            errMsg = 'Xin hãy chọn phim';

        } else if (!rap) {
            errMsg = 'Xin hãy chọn rạp';

        } else if (!ngayXem) {
            errMsg = 'Xin hãy chọn ngày xem';

        } else if (!suatChieu) {
            errMsg = 'Xin hãy chọn suất chiếu';
        }  else if (authReducer == null) {
            errMsg = 'Xin hãy đăng nhập trước';

        }   else if (phim && rap && ngayXem && suatChieu && authReducer) {
            errMsg = '';
            this.setState({
                isOpenErrMsg: false
            })
        }
        this.setState({
            errMsg
        })
    }
    handleChange = (e, item, arr) => {
        let { rap, ngayXem, suatChieu, phim } = this.select;
        rap = rap.current.select;
        phim = phim.current.select;
        ngayXem = ngayXem.current.select;
        suatChieu = suatChieu.current.select;
        this.setState({
            [item]: e ? e.value : null
        }, () => {
            if (this.state.phim && item === "phim") {
                this.setState({
                    rap: null,
                    ngayXem: null,
                    suatChieu: null,
                    rapOptions: [],
                    ngayXemOptions: [],
                    suatChieuOptions: [],
                }, () => {
                    if (this.select.rap.current.select.props.value) {
                        this.select.rap.current.select.clearValue();
                    }
                    if (this.select.ngayXem.current.select.props.value) {
                        this.select.ngayXem.current.select.clearValue();
                    }
                    if (this.select.suatChieu.current.select.props.value) {
                        this.select.suatChieu.current.select.clearValue();
                    }
                    this.setLoading("isLoadingRap", true);
                    Axios({
                        method: 'GET',
                        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${this.state[item]}`
                    })
                    .then((res) => {
                        const { data } = res;
                        const { lichChieu } = data;
                        const array = [];
                        this.setState({
                            lichChieu
                        })
                        lichChieu.forEach((nestedData) => {
                            const option = { label: nestedData.thongTinRap.tenCumRap, value: nestedData.thongTinRap.maCumRap }
                            array.push(option);
                        })
                        arr = _.uniqBy(array, 'label');
                        this.setState({
                            rapOptions: arr,
                        }, () => {
                            this.setLoading("isLoadingRap", false);
                        })
                    })
                    .catch((err) => {
    
                    })
                })
            }
            else if (this.state.rap && item === "rap") {
                this.setState({
                    ngayXem: null,
                    suatChieu: null,
                    ngayXemOptions: [],
                    suatChieuOptions: [],
                }, () => {
                    if (this.select.ngayXem.current.select.props.value) {
                        this.select.ngayXem.current.select.clearValue();
                    }
                    if (this.select.suatChieu.current.select.props.value) {
                        this.select.suatChieu.current.select.clearValue();
                    }
                    this.setLoading("isLoadingNgayXem", true);
                    Axios({
                        method: 'GET',
                        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${this.state.phim}`
                    }).then((res) => {
                        const { lichChieu } = res.data;
                        let now = new Date();
                        // mock date
                        now = now.valueOf();
                        let ngayXemOptions = lichChieu.filter(item => new Date(item.ngayChieuGioChieu).valueOf() > now);
                        let array = [];
                        ngayXemOptions.forEach((item, index) => {
                            const timeParse = item.ngayChieuGioChieu.split('T')[0];
                            const object = {label: timeParse, value: item.ngayChieuGioChieu, timeToParse: new Date(timeParse).setHours(0), index: index, maLichChieu: item.maLichChieu}
                            array.push(object);
                        })
                        const duplicateIds = array
                        .map(e => e['label'])
                        .map((e, i, final) => final.indexOf(e) !== i && i)
                        .filter(obj=> array[obj])
                        .map(e => array[e]["label"])
     
                        const duplicate = array.filter(obj=> duplicateIds.includes(obj.label));
                        const value = [];
                        duplicate.forEach((item) => {
                            value.push(item.value);
                        })
                        array = _.uniqBy(array, 'label');
                        const sortedArray = array.sort((a,b) => {
                            return a.timeToParse - b.timeToParse;
                        })
                        this.setState({
                            ngayXemOptions: sortedArray,
                            multipleSuatChieu: value
                        }, () => {
                            this.setLoading("isLoadingNgayXem", false);
                        })
                    })
                })
            }
            else if (this.state.ngayXem && item === 'ngayXem') {  
                this.setState({
                    suatChieu: null,
                }, () => {
                    if (this.select.suatChieu.current.select.props.value) {
                        this.select.suatChieu.current.select.clearValue();
                    }
                    let { ngayXem, multipleSuatChieu } = this.state;
                    let suatChieuOptions = [];
                    ngayXem = ngayXem.split('T')[0];
                    const toValidate = multipleSuatChieu.map((item) => {
                        item = item.split('T')[0].slice(0, 5);
                        return item;
                    })  
                    if (toValidate.includes(ngayXem)) {
                        multipleSuatChieu.forEach((item) => {
                            const temp = { label: item.split('T')[1], value: item.split('T')[1], maLichChieu: item.maLichChieu };
                            suatChieuOptions.push(temp);
                        })
                    }
                    else {
                        const gioXem = this.state.ngayXem.split('T')[1].slice(0, 5);
                        const temp = { label: gioXem, value: gioXem, maLichChieu: e.maLichChieu };
                        suatChieuOptions.push(temp);
                    }
                    this.setState({
                        suatChieuOptions,
                    })
                    suatChieu.focus();
                })
            }   
            else if (this.state.ngayXem && item === 'suatChieu') {
                this.setState({
                    maLichChieu: e.maLichChieu
                })
            } 
        })
    }
    render() {
        const { rapOptions, ngayXemOptions, suatChieuOptions, isOpenErrMsg, errMsg, isLoadingRap, isLoadingNgayXem } = this.state;
        const { listMovie = [], authReducer } = this.props;
        let phimOptions = [];
        listMovie && listMovie.forEach((item) => {
            const option = {value: item.maPhim, label: item.tenPhim};
            phimOptions.push(option);
        })
        let toRoute = '';
        if (this.state.maLichChieu && authReducer) {
            toRoute = `/datve/${this.state.maLichChieu}`;
        }
        return (
            <div className="carousel">
                <div id="carouselExampleCaptions" className="carousel slide" 
                // data-ride="carousel"
                >
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
                    <li data-target="#carouselExampleCaptions" data-slide-to={1} />
                    <li data-target="#carouselExampleCaptions" data-slide-to={2} />
                </ol>
                <div className="carousel-inner inner-height">
                    <div className="carousel-item active">
                        <img src={listMovie && listMovie[0].hinhAnh} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                        <img src={listMovie && listMovie[1].hinhAnh} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={listMovie && listMovie[2].hinhAnh} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
                </div>
                <div className="select-box-sections">
                    <Select isDisabled={isLoadingRap || isLoadingNgayXem} options={phimOptions && phimOptions} className="custom-select-lg first-item widthByPercent" aria-label="Default select example" ref={this.select.phim} onChange={(e) => {this.handleChange(e, "phim", rapOptions)}} placeholder="Phim"></Select>
                    {isLoadingRap ? 
                        <div className="widthByPercent">
                            <button className="btn btn-primary w-100" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    :
                    <Select isDisabled={isLoadingNgayXem} noOptionsMessage={() => "Vui lòng chọn phim"}options={rapOptions && rapOptions} className="custom-select-lg widthByPercent" aria-label="Default select example"  openMenuOnFocus="true" ref={this.select.rap} onChange={(e) => {this.handleChange(e, "rap", ngayXemOptions)}} placeholder="Rạp">
                    </Select>}
                    {isLoadingNgayXem ? 
                        <div className="widthByPercent">
                            <button className="btn btn-primary w-100" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    :
                    <Select noOptionsMessage={() => "Vui lòng chọn rạp"} options={ngayXemOptions && ngayXemOptions} className="custom-select-lg widthByPercent" aria-label="Default select example"  openMenuOnFocus="true" ref={this.select.ngayXem} onChange={(e) => {this.handleChange(e, "ngayXem", suatChieuOptions)}} placeholder="Ngày xem"></Select>}
                    <Select noOptionsMessage={() => "Vui lòng chọn ngày xem"} options={suatChieuOptions && suatChieuOptions} className="custom-select-lg widthByPercent" aria-label="Default select example"  openMenuOnFocus="true" ref={this.select.suatChieu} onChange={(e) => {this.handleChange(e, "suatChieu", null)}} placeholder="Suất chiếu"></Select>
                    <Link 
                    className="widthByPercent btn-danger button-mua-ve" 
                    to = {toRoute}
                    onClick={this.handleClick}>
                        MUA VÉ NGAY
                    </Link>
                    <Collapse in={isOpenErrMsg}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {this.setErrorMsgStatus(false)}}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity="error"
                    >   
                        {errMsg} {!authReducer && <Link to="/auth" style={{ textDecoration: 'none' }}>Đăng nhập tại đây</Link>}
                    </Alert>
                    </Collapse>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    listMovie: state.listMovieReducer.data,
    authReducer: state.authReducer.data
  };
};
export default connect(mapStateToProps, null)(Carousel);