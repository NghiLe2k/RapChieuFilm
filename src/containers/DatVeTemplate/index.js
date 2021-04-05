import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';
import _ from 'lodash';
import Loader from './../../components/Loader';
import LeftSideDatVe from './../../components/LeftSideDatVe';
import ContentDatVe from './../../components/ContentDatVe';
import RightSideDatVe from './../../components/RightSideDatVe';
import { connect } from 'react-redux'

class DatVe extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: {},
          loading: false,
          count: 0,
          danhSachGheDuocDat: []
        }
    }

    componentDidMount() {
        const { match: { params : { id } } } = this.props;
        this.setState({
          loading: true
        })
        if (id) {
            axios({
                method:'GET',
                url:`https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
            })
            .then((res) => {
                const { data } = res;
                console.log('res', res);
                this.setState({
                    data,
                    loading: false
                })
            })
            .catch((err) => {
                console.log('err', err);
            })
        }
    }

    getDatVeState = (value) => {
      this.setState({
        count: value
      })
    }

    getGheDuocDatState = (arr) => {
      this.setState({
        danhSachGheDuocDat: arr,
      })
    }
    renderHTML = () => {
        const { data } = this.state;
        const { thongTinPhim = {}, danhSachGhe = [] } = data;
        const { match: { params : { id } } } = this.props;
        return (
          <div className="row dat-ve-container">
            <LeftSideDatVe hinhAnh={thongTinPhim.hinhAnh}/>
            <ContentDatVe 
              tenCumRap = {thongTinPhim.tenCumRap} 
              gioChieu={thongTinPhim.gioChieu} 
              ngayChieu={thongTinPhim.ngayChieu} 
              tenRap={thongTinPhim.tenRap} 
              danhSachGhe={danhSachGhe}
              getDatVeState={(value) => this.getDatVeState(value)}
              getGheDuocDatState={(arr) => this.getGheDuocDatState(arr)}
              count={this.state.count}
              danhSachGheDuocDat={this.state.danhSachGheDuocDat}
              authReducer={this.props.authReducer}
            />
            <RightSideDatVe 
              gioChieu={thongTinPhim.gioChieu} 
              ngayChieu={thongTinPhim.ngayChieu} 
              tenCumRap = {thongTinPhim.tenCumRap} 
              tenPhim = {thongTinPhim.tenPhim}
              tenRap={thongTinPhim.tenRap} 
              diaChi={thongTinPhim.diaChi} 
              count={this.state.count}
              danhSachGheDuocDat={this.state.danhSachGheDuocDat}
              maLichChieu={id}
              authReducer={this.props.authReducer}
            />
          </div>
        )
    }
    render() {
        const { loading } = this.state;
        return (
            <div className="dat-ve">
              {loading ? <Loader /> : this.renderHTML()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer.data
  };
};
export default connect(mapStateToProps, null)(DatVe);