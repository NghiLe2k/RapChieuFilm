import React, { Component } from 'react';
import './index.scss';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import ErrorIcon from '@material-ui/icons/Error';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Axios from 'axios';
const styles = theme => ({
    root: {
      '& > *': {
        marginTop: '16px',
        marginBottom: '16px',
        width: '25ch',
        border: 'none'
      },
    },
    input: {
        border: "1px solid #ced4da",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
        paper: {
        backgroundColor: '#fff',
        color: '#000',
        width: 400,
        height: 125,
        padding: "25px"
    },
})

class RightSideDatVe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maGiamGia: '',
            condition: false,
            isOpen: false,
        }
    }
    
    handleChange = (e) => {
        const { target } = e;
        const { value, name } = target;
        this.setState({
            [name]: value
        })
    }

    handleClick = (e, data) => {
        e.preventDefault();
        const { authReducer }= this.props;
        const { accessToken }= authReducer;
        Axios({
            url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe',
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST'
        }).then((res) => {
            if(res) {
                this.setState({
                    isOpen: true
                })
            }
        })
    }

    handleClose = () => {
        this.setState({
            isOpen: false,
        })
    }
    render() {
        const { gioChieu, ngayChieu, tenCumRap, tenRap, tenPhim, classes, count, danhSachGheDuocDat, maLichChieu, authReducer } = this.props;
        const { maGiamGia, condition } = this.state;
        let formattedDanhSach = [];
        let danhSachVe = [];
        danhSachGheDuocDat.forEach((item) => {
            const { label } = item;
            if (label === 'A') {
                item.tenGheToRender = item.tenGhe;
            } else if (label === 'B') {
                item.tenGheToRender = item.tenGhe < 10 + 16 ? `0${item.tenGhe - 16}` : item.tenGhe - 16;
            } else if (label === 'C') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 2? `0${item.tenGhe - 16 * 2}` : item.tenGhe - 16 * 2 ;
            } else if (label === 'D') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 3 ? `0${item.tenGhe - 16 * 3}` : item.tenGhe - 16 * 3 ;
            } else if (label === 'E') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 4 ? `0${item.tenGhe - 16 * 4}` : item.tenGhe - 16 * 4 ;
            } else if (label === 'F') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 5 ? `0${item.tenGhe - 16 * 5}` : item.tenGhe - 16 * 5 ;
            } else if (label === 'G') { 
                item.tenGheToRender = item.tenGhe < 10 + 16 * 6 ? `0${item.tenGhe - 16 * 6}` : item.tenGhe - 16 * 6 ;
            } else if (label === 'H') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 7 ? `0${item.tenGhe - 16 * 7}` : item.tenGhe - 16 * 7 ;
            } else if (label === 'I') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 8 ? `0${item.tenGhe - 16 * 8}` : item.tenGhe - 16 * 8 ;
            } else if (label === 'J') {
                item.tenGheToRender = item.tenGhe < 10 + 16 * 9 ? `0${item.tenGhe - 16 * 9}` : item.tenGhe - 16 * 9 ;
            }
            const string = item.label.concat(item.tenGheToRender);
            formattedDanhSach.push(string);
            const obj = { maGhe: item.maGhe, giaVe: item.giaVe }
            danhSachVe.push(obj);
        })
        formattedDanhSach = formattedDanhSach.join(', ');
        const disabled = count ? false : true
        const data = {
            maLichChieu,
            danhSachVe,
            taiKhoanNguoiDung: authReducer.taiKhoan
        }
        return (
            <div className="col-3 right-side">
                <div className="count">
                    {count}d
                </div>
                <div className="content-right-side">
                    <div className="ten-phim">
                        {tenPhim}
                    </div>
                    <div className="ten-cum-rap">
                        {tenCumRap}
                    </div>                    
                    <div className="ten-ngayChieu">
                        {ngayChieu} - {gioChieu} - {tenRap}
                    </div>
                    <div className="ghe">
                        <span className="red">Ghế {formattedDanhSach}</span>
                        <span className="green">{count}d</span>
                    </div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" defaultValue={authReducer.email} onChange={this.handleChange} />
                        <TextField id="outlined-basic" label="Phone" variant="outlined" name="phone" defaultValue={authReducer.soDT} onChange={this.handleChange} />
                        <TextField className="col-8" id="outlined-basic" label="Mã giảm giá" variant="outlined" name="maGiamGia" onChange={this.handleChange}/>
                        <button className="btn btn-success col-3 button" disabled={disabled}>Áp dụng</button>
                        <div className="w-100 text-center warn">
                            <ErrorIcon color="error" className="icon"/>
                            Vé đã mua không thể đổi hoặc hoàn tiền Mã vé sẽ được gửi qua tin nhắn 
                            <span className="colored"> ZMS</span> (tin nhắn Zalo) và 
                            <span className="colored"> Email</span> đã nhập.
                        </div>
                        <button type ="submit" className="btn btn-success w-100" disabled={disabled} onClick={(e) => {this.handleClick(e, data)}}>Đặt vé</button>
                    </form>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.isOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    onClose={this.handleClose}
                >
                    <Fade in={this.state.isOpen}>
                    <div className={classes.paper}>
                        <p id="transition-modal-description" style={{ color : ''}}>Đặt vé thành công</p>
                        <button className="btn btn-secondary" style={{ marginLeft: '280px' }} onClick={this.handleClose}>Đóng</button>
                    </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(RightSideDatVe);