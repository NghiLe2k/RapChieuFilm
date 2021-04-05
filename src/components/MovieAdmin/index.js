import React, { Component } from "react";
// import DeleteUser from "./../../containers/AdminTemplate/DeleteUser/index";
export default class MovieAdmin extends Component {
  constructor(props) {
    super(props);
  }
  handleEdit = () => {
    const { movie, clickedEdit, getSelectedUser } = this.props;
    getSelectedUser(movie);
    clickedEdit();
  };
  render() {
    const { movie } = this.props;
    return (
      <tr>
        <td>{movie.maPhim}</td>
        <td>{movie.tenPhim}</td>
        <td>{movie.ngayKhoiChieu}</td>
        <td>
          <img
            src={movie.hinhAnh}
            style={{ width: "100px", height: "150px" }}
          />
        </td>
        <td>
          <button
            className="btn btn-info d-flex"
            onClick={this.handleEdit}
            data-toggle="modal"
            data-target="#modelId"
          >
            Sửa
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              const { movie } = this.props;
              this.props.handleDeleteFilm(movie.maPhim);
            }}
          >
            xóa
          </button>
        </td>
      </tr>
    );
  }
}
