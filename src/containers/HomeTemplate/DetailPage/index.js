import React, { Component } from "react";
import { actDetailPageApi } from "./modules/action";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader";
import { Link } from "react-router-dom";

class DetailPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDetailMovie(id);
  }

  renderTable = () => {
    const { data } = this.props;
    if (data) {
      return data.lichChieu.map((item) => {
        return (
          <tr key={item.maLichChieu}>
            <td>
              <p>{item.thongTinRap.tenCumRap}</p>
            </td>
            <td>
              <p>{item.thongTinRap.tenRap}</p>
            </td>
            <td>
              <p>{new Date(item.ngayChieuGioChieu).toLocaleTimeString()}</p>
            </td>
            <td>
              <p>{new Date(item.ngayChieuGioChieu).toLocaleDateString()}</p>
            </td>
            <td>
              <Link className="btn btn-success" to="/">
                Booking
              </Link>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    const { loading, data } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="BG__chitietfilm">
        <div className="container">
          {/* <h3 style={{ color: "whitesmoke" }}>Chi tiết film</h3> */}
          <div className="row">
            <div className="col-md-6">
              <img className="img-fluid" src={data && data.hinhAnh} alt="" />
              {/* <button className="btn btn-success">Mua vé </button> */}
            </div>
            <div className="col-md-6">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <p>Tên Phim</p>
                    </td>
                    <td>
                      <p>{data && data.tenPhim}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Mô tả</p>{" "}
                    </td>
                    <td>
                      <p>{data && data.moTa}</p>
                    </td>
                  </tr>
                  <tr>
                    <Link className="btn btn-success" to="/">
                      Booking
                    </Link>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <p>Cụm rạp</p>
                    </th>
                    <th>
                      <p>Tên rạp</p>
                    </th>
                    <th>
                      <p>Giờ chiếu</p>
                    </th>
                    <th>
                      <p>Ngày chiếu</p>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderTable()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.detailPageReducer.loading,
    data: state.detailPageReducer.data,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    getDetailMovie: (id) => {
      dispatch(actDetailPageApi(id));
    },
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DetailPage);
