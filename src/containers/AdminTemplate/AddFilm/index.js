import React, { Component } from "react";
import { actAddFilmApi } from "./modules/action";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader";

class AddPhim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maPhim: 0,
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "",
      danhGia: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie !== this.props.movie) {
      const {
        maPhim,
        tenPhim,
        biDanh,
        trailer,
        hinhAnh,
        moTa,
        maNhom,
        ngayKhoiChieu,
        danhGia,
      } = nextProps.movie;
      const { getInputData } = nextProps;
      this.setState({
        maPhim,
        tenPhim,
        biDanh,
        trailer,
        hinhAnh,
        moTa,
        maNhom,
        ngayKhoiChieu,
        danhGia,
      });
      if (nextProps.isEdit) {
        this.setState({
          renderLabel: false,
          label: "Edit Phim",
        });
        getInputData("maPhim", maPhim);
        getInputData("tenPhim", tenPhim);
        getInputData("biDanh", biDanh);
        getInputData("trailer", trailer);
        getInputData("hinhAnh", hinhAnh);
        getInputData("moTa", moTa);
        getInputData("maNhom", maNhom);
        getInputData("danhGia", danhGia);
        getInputData("ngayKhoiChieu", ngayKhoiChieu);
      } else {
        this.setState({
          renderLabel: true,
          label: "Thêm Phim",
        });
      }
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    const { getInputData } = this.props;
    this.setState(
      {
        [name]: value,
      },
      () => {
        getInputData(name, value);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addFilm(this.state);
  };

  renderNoti = () => {
    const { error } = this.props;
    if (error) {
      if (error.response && error.response.status === 401)
        return <div className="alert alert-danger">Chua co token</div>;
      if (error.response && error.response.data) {
        return <div className="alert alert-danger">{error.response.data}</div>;
      }
    }
  };

  render() {
    const { loading } = this.props;
    const {
      maPhim,
      tenPhim,
      biDanh,
      trailer,
      hinhAnh,
      moTa,
      maNhom,
      ngayKhoiChieu,
      danhGia,
      renderLabel = true,
      label = "Thêm phim",
    } = this.state;
    if (loading) return <Loader />;
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h3>{label}</h3>
        {this.renderNoti()}
        <div className="form-group">
          <span>Mã phim</span>
          <input
            className="form-control"
            name="maPhim"
            onChange={this.handleOnChange}
            defaultValue={maPhim}
          />
        </div>
        <div className="form-group">
          <span>Tên Phim</span>
          <input
            className="form-control"
            name="tenPhim"
            onChange={this.handleOnChange}
            defaultValue={tenPhim}
          />
        </div>
        <div className="form-group">
          <span>Bí danh</span>
          <input
            className="form-control"
            name="biDanh"
            onChange={this.handleOnChange}
            defaultValue={biDanh}
          />
        </div>
        <div className="form-group">
          <span>Trailer</span>
          <input
            className="form-control"
            name="trailer"
            onChange={this.handleOnChange}
            defaultValue={trailer}
          />
        </div>
        <div className="form-group">
          <span>Hình ảnh</span>
          <input
            className="form-control"
            name="hinhAnh"
            onChange={this.handleOnChange}
            defaultValue={hinhAnh}
          />
        </div>
        <div className="form-group">
          <span>Mô tả</span>
          <input
            className="form-control"
            name="moTa"
            onChange={this.handleOnChange}
            defaultValue={moTa}
          />
        </div>
        <div className="form-group">
          <span>Mã nhóm</span>
          <input
            className="form-control"
            name="maNhom"
            onChange={this.handleOnChange}
            defaultValue={maNhom}
          />
        </div>
        <div className="form-group">
          <span>Ngày khởi chiếu</span>
          <input
            className="form-control"
            name="ngayKhoiChieu"
            onChange={this.handleOnChange}
            defaultValue={ngayKhoiChieu}
          />
        </div>
        <div className="form-group">
          <span>Đánh giá</span>
          <input
            className="form-control"
            name="danhGia"
            onChange={this.handleOnChange}
            defaultValue={danhGia}
          />
        </div>
        <div className="form-group">
          {renderLabel && (
            <button type="submit" className="btn btn-success">
              thêm phim
            </button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.addUserReducer.loading,
    error: state.addUserReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFilm: (movie) => {
      dispatch(actAddFilmApi(movie));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhim);
