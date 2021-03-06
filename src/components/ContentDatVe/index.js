import React, { Component } from 'react';
import './index.scss';
import bhd from '../../assets/img/rapimg/bhd.png';
import cinestar from '../../assets/img/rapimg/cinestar.png';
import dongda from '../../assets/img/rapimg/dongda.png';
import megags from '../../assets/img/rapimg/megags.png';
import cine from '../../assets/img/rapimg/cine.jpg';
import lotte from '../../assets/img/rapimg/lotte.png';
import { withStyles } from '@material-ui/styles';
import Countdown from "react-countdown";
import { zeroPad } from 'react-countdown';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import WeekendIcon from '@material-ui/icons/Weekend';

const styles = theme => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: '#fff',
        color: '#000',
        width: 400,
        height: 100,
        padding: "25px"
      },
})

class ContentDatVe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            count: 0,
        }
    }

    handleComplete = () => {
        this.setState({
            isOpen: true,
        })
    }

    handleRefresh = () => {
        window.location.reload();
    }

    handleClick = (e, item, index) => {
        let label = '';
        if (index >= 0 && index < 16) {
            label = 'A';
        } else if (index >= 16 && index < 32) {
            label = 'B';
        } else if (index >= 32 && index < 48) {
            label = 'C';
        } else if (index >= 48 && index < 64) {
            label = 'D';
        } else if (index >= 64 && index < 80) {
            label = 'E';
        } else if (index >= 80 && index < 96) {
            label = 'F';
        } else if (index >= 96 && index < 112) {
            label = 'G';
        } else if (index >= 112 && index < 128) {
            label = 'H';
        } else if (index >= 128 && index < 144) {
            label = 'I';
        } else if (index >= 144 && index < 160) {
            label = 'J';
        } 
        let { count, getDatVeState, danhSachGheDuocDat, getGheDuocDatState } = this.props;
        let { tenGhe, maGhe, giaVe } = item;
        const obj = { label, tenGhe, maGhe, giaVe };
        if (!item.veDuocDat) {
            item.veDuocDat = true;
            count += item.giaVe;
            danhSachGheDuocDat.push(obj);
        } else {
            item.veDuocDat = false;
            count -= item.giaVe;
            const filtered = danhSachGheDuocDat.find((data) => data.tenGhe == item.tenGhe);
            danhSachGheDuocDat = danhSachGheDuocDat.filter((data) => data.tenGhe !== filtered.tenGhe);
        }
        getDatVeState(count);
        getGheDuocDatState(danhSachGheDuocDat);
    }

    renderChair = () => {
        const { danhSachGhe } = this.props;
        return danhSachGhe.map((item, index) => {
            let className = 'each-item';
            if (item.veDuocDat) {
                className += " active";
            }
            if (item.loaiGhe == 'Vip') {
                className += " vip"
            }
            if (item.daDat) {
                className += ' disabled'
            }
            return (
                <div key={index} className={className} disabled={item.daDat} onClick={(e) => this.handleClick(e, item, index)}>
                    <WeekendIcon />
                </div>
            )
        })
    }

    renderLabel = () => {
        const label = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ,'I', 'J']
        return label.map((item, index) => {
            return (
                <div key={index} className="label">
                    {item}
                </div>
            )
        })
    }

    renderer = ({ hours, minutes, seconds, completed }) => {
        return (
            <span>
                {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
        )
    }

    renderCard = () => {
        const loaiGhe = [
            {label: 'Gh??? th?????ng', color: '#212529'},
            {label: 'Gh??? VIP', color: '#f7b500'},
            {label: 'Gh??? ????i', color: '#b03550'},
            {label: 'Gh??? ??ang ch???n', color: '#28a745'},
            {label: 'Gh??? ???? c?? ng?????i ch???n', color: '#e7eaec'},
            {label: 'Gh??? kh??ng th??? ch???n', color: 'rgba(16,34,53,.2)'},
        ]
        return loaiGhe.map((item) => {
            const { color } = item;
            return (
                <div className="wrapper">
                    <WeekendIcon style={{ color }}/>
                    <div className="item-label">{item.label}</div>
                </div>
            )
        })
    }

    render() {
        const { tenCumRap, ngayChieu, gioChieu, tenRap, classes, danhSachGhe, authReducer } = this.props;
        const { isOpen } = this.state;
        let img = '';
        let colored = "";
        if (tenCumRap) {
            if (tenCumRap.toLowerCase().includes('bhd')) {
                img = bhd;
                colored = "#8bc541";
            } else if (tenCumRap.toLowerCase().includes('cinistar')) {
                img = cinestar;
                colored = "#df0d7a";
            } else if (tenCumRap.toLowerCase().includes('dongda')) {
                img = dongda;
            } else if (tenCumRap.toLowerCase().includes('megags')) {
                img = megags;
                colored = "#e5a813";
            } else if (tenCumRap.toLowerCase().includes('cine')) {
                img = cine;
                colored = "#008FE5";
            } else if (tenCumRap.toLowerCase().includes('lotte')) {
                img = lotte;
                colored = "#CA4137";
            }
        }
        const coloredText = tenCumRap && tenCumRap.split('-')[0];
        const normalText = tenCumRap && tenCumRap.split('-')[1];
        return (
            <div className="content col-8">
                <div className="row content-container">
                    <div className="col-3 step-1">
                        <span>01 CH???N GH??? & THANH TO??N</span>
                    </div>
                    <div className="col-3 step-2">
                        <span>02 K???T QU??? ?????T V??</span>
                    </div>
                    <div className="col-3 user">
                        <span>{authReducer.taiKhoan}</span>
                    </div>
                </div>
                <div className="container ghe-section">
                    <div className="header">
                        <div className="left-side-content row">
                            <div className="col-1 img">
                                <img 
                                src={img} 
                                />
                            </div>
                            <div className="col-3">
                                <p><span style = {{ color: colored }}>{coloredText}</span> - <span className="normal">{normalText}</span></p>
                                <p className="ngay-chieu">{ngayChieu} - {gioChieu} - {tenRap}</p>
                            </div>
                        <div className="right-side-content">
                            <p className="ngay-chieu">th???i gian gi??? gh???</p>
                            <Countdown date={(Date.now() + 300000)} className="timer" onComplete={this.handleComplete} renderer={this.renderer}/>
                        </div>
                        </div>
                    </div>
                    <div className="content container">
                            <div className="screen">
                                <p className="title">M??n h??nh</p>
                            </div>
                            <div className="chair-component"> 
                                <div>
                                    {this.renderLabel()}
                                </div>
                                <div>
                                    {this.renderChair()}
                                </div>
                            </div>
                            <div className="card-custom">
                                {this.renderCard()}
                            </div>
                    </div>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={isOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={isOpen}>
                    <div className={classes.paper}>
                        <p id="transition-modal-description">???? h???t th???i gian gi??? gh???. Vui l??ng th???c hi???n ????n h??ng trong th???i h???n 5 ph??t. <span style={{ color: '#fb4226', cursor: 'pointer' }}onClick={this.handleRefresh}>?????t v?? l???i</span></p>
                    </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(ContentDatVe);