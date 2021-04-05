import React, { Component } from "react";
import { actAddUserApi } from "./modules/action";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      const {
        email,
        hoTen,
        maLoaiNguoiDung,
        soDt,
        taiKhoan,
        matKhau,
      } = nextProps.user;
      const { getInputData } = nextProps;
      this.setState({
        email,
        hoTen,
        maLoaiNguoiDung,
        soDt,
        taiKhoan,
        matKhau,
      });
      if (nextProps.isEdit) {
        this.setState({
          renderLabel: false,
          label: "Edit Profile",
        });
        getInputData("email", email);
        getInputData("hoTen", hoTen);
        getInputData("maLoaiNguoiDung", maLoaiNguoiDung);
        getInputData("soDt", soDt);
        getInputData("taiKhoan", taiKhoan);
        getInputData("matKhau", matKhau);
      } else {
        this.setState({
          renderLabel: true,
          label: "Thêm người dùng",
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
    this.props.addUser(this.state);
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
  refresh = () => {
    window.location.reload();
  };
  render() {
    const { loading } = this.props;
    const {
      email,
      hoTen,
      maLoaiNguoiDung,
      soDt,
      taiKhoan,
      matKhau,
      maNhom,
      renderLabel = true,
      label = "Thêm người dùng",
    } = this.state;
    if (loading) return <Loader />;
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h3>{label}</h3>
        {this.renderNoti()}
        <div className="form-group">
          <span>Tài khoản</span>
          <input
            className="form-control"
            name="taiKhoan"
            onChange={this.handleOnChange}
            defaultValue={taiKhoan}
          />
        </div>
        <div className="form-group">
          <span>Mật khẩu</span>
          <input
            className="form-control"
            name="matKhau"
            onChange={this.handleOnChange}
            defaultValue={matKhau}
          />
        </div>
        <div className="form-group">
          <span>Họ tên</span>
          <input
            className="form-control"
            name="hoTen"
            onChange={this.handleOnChange}
            defaultValue={hoTen}
          />
        </div>
        <div className="form-group">
          <span>Email</span>
          <input
            className="form-control"
            name="email"
            onChange={this.handleOnChange}
            defaultValue={email}
          />
        </div>
        <div className="form-group">
          <span>Số điện thoại</span>
          <input
            className="form-control"
            name="soDt"
            onChange={this.handleOnChange}
            defaultValue={soDt}
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
          <div style ={{ color: "#bd2130", minHeight: '20px' }}>
            {this.props.validateMsg}
          </div>
        </div>
        <div className="form-group">
          <span>Mã loại người dùng</span>
          <input
            className="form-control"
            name="maLoaiNguoiDung"
            onChange={this.handleOnChange}
            defaultValue={maLoaiNguoiDung}
          />
        </div>
        <div className="form-group">
          {renderLabel && (
            <button type="submit" className="btn btn-success">
              Thêm người dùng
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
    addUser: (user) => {
      dispatch(actAddUserApi(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
