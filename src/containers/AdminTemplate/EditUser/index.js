import React, { Component } from "react";

export default class EditUser extends Component {
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

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state);
  };

  render() {
    return (
      <div>
        {this.props.user}
        {/* <form className="container" onSubmit={this.handleSubmit}>
          <h3>Edit người dùng</h3>
          {this.renderNoti()}
          <div className="form-group">
            <span>Tài khoản</span>
            <input
              className="form-control"
              name="taiKhoan"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <span>Mật khẩu</span>
            <input
              className="form-control"
              name="matKhau"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <span>Họ tên</span>
            <input
              className="form-control"
              name="hoTen"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <span>Email</span>
            <input
              className="form-control"
              name="email"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <span>Số điện thoại</span>
            <input
              className="form-control"
              name="soDt"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <span>Mã nhóm</span>
            <input
              className="form-control"
              name="maNhom"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <span>Mã loại người dùng</span>
            <input
              className="form-control"
              name="maLoaiNguoiDung"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form> */}
      </div>
    );
  }
}
