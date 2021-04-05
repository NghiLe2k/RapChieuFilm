import React, { Component } from "react";
// import DeleteUser from "./../../containers/AdminTemplate/DeleteUser/index";
export default class Users extends Component {
  constructor(props) {
    super(props);
  }

  handleEdit = () => {
    const { user, clickedEdit, getSelectedUser } = this.props;
    getSelectedUser(user);
    clickedEdit();
  };
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.taiKhoan}</td>
        <td>{user.hoTen}</td>
        <td>{user.email}</td>
        <td>{user.soDt}</td>
        <td>{user.matKhau}</td>
        <td>
          <button
            className="btn btn-info d-flex"
            onClick={this.handleEdit}
            data-toggle="modal"
            data-target="#modelId"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              const { user } = this.props;
              this.props.handleDeleteUser(user.taiKhoan);
            }}
          >
            xoa
          </button>
        </td>
      </tr>
    );
  }
}
