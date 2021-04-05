import React, { Component } from "react";
import MovieAdmin from "../../../components/MovieAdmin";
import { actListMovieApi } from "../../HomeTemplate/DangChieu/modules/actions";
import { connect } from "react-redux";
import AddFilm from "../AddFilm";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import _ from 'lodash';
import Axios from "axios";
import { actMovieListDeleteFailed } from "./../../HomeTemplate/DangChieu/modules/actions";

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

const mockFilm = {
  maPhim: "",
  tenPhim: "",
  biDanh: "",
  trailer: "",
  hinhAnh: "",
  moTa: "",
  maNhom: "",
  ngayKhoiChieu: "",
  danhGia: "",
};
class FilmManeger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      data: {},
      errMsg: "",
      maPhim: 0,
    };
    this.onClickButton = React.createRef();
  }
  componentDidMount() {
    this.props.listMovieApi();
  }

  handleDeleteFilm = (id) => {
    this.props.deleteFilmAPI(id);
    this.openMessage();
  };

  getSelectedUser = (data) => {
    this.setState({
      movie: data,
    });
  };

  renderHMTL = () => {
    const { listMovie } = this.props;
    if (listMovie && listMovie.length > 0) {
      return listMovie.map((movie) => {
        return (
          <MovieAdmin
            movie={movie}
            handleDeleteFilm={this.handleDeleteFilm}
            resetIsEdit={this.resetIsEdit}
            clickedEdit={this.clickedEdit}
            getSelectedUser={this.getSelectedUser}
          />
        );
      });
    }
  };

  openMessage = () => {
    const { errorDelete } = this.props;
    if (errorDelete) {
      alert("Phim chưa thể xóa được");
    }
  };

  resetIsEdit = () => {
    this.setState({
      isEdit: false,
    });
  };

  clickedEdit = () => {
    this.setState({
      isEdit: true,
    });
  };

  handleEdit = () => {
    let { data } = this.state;
    data.maPhim = _.isString(data.maPhim) ? parseInt(data.maPhim) : data.maPhim;
    data.danhGia = _.isString(data.danhGia) ? parseInt(data.danhGia) : data.danhGia;
    data = {
      ...data,
    }
    let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/demo",
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res) {
          this.setState({
            isOpen: true,
            errMsg: "Edit thành công",
            validateMsg: ""
          })
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  getInputData = (label, value) => {
    const { movie } = this.state;
    this.setState({
      data: {
        ...movie,
        [label]: value,
      },
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    })
    this.onClickButton.current.click();
  }
  render() {
    const { isEdit, data } = this.state;
    const { classes } = this.props;
    let condition;
    if (data && _.isNumber(data.maPhim)) {
      condition = _.isNumber(data.maPhim);
    } else if (data && _.isString(data.maPhim)) {
      condition = data.maPhim.length > 0
    }
    let condition1;
    if (data && _.isNumber(data.danhGia)) {
      condition1 = _.isNumber(data.danhGia);
    } else if (data && _.isString(data.danhGia)) {
      condition1 = data.danhGia.length > 0
    }
    // TO DO
    const disabled = 
    condition &&
    !_.isEmpty(data.tenPhim) &&
    !_.isEmpty(data.biDanh) &&
    !_.isEmpty(data.trailer) &&
    !_.isEmpty(data.hinhAnh) &&
    !_.isEmpty(data.moTa) &&
    !_.isEmpty(data.maNhom) &&
    !_.isEmpty(data.ngayKhoiChieu) &&
    condition1
    ? false : true;
    return (
      <div>
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          aria-labelledby="modelTitleId"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{ maxWidth: 1000 }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"></h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <AddFilm
                  movie={isEdit ? this.state.movie : mockFilm}
                  isEdit={isEdit}
                  getInputData={this.getInputData}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  ref={this.onClickButton}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={isEdit && this.handleEdit}
                  // TODO
                  disabled={disabled}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-danger "
          data-toggle="modal"
          data-target="#modelId"
          onClick={this.resetIsEdit}
        >
          Add phim
        </button>
        <table className="table container">
          <thead className="mb-5">
            <tr>
              <th>Mã Phim</th>
              <th>Tên Phim</th>
              <th>Ngày khởi chiếu</th>
              <th>Hình Ảnh</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>{this.renderHMTL()}</tbody>
        </table>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.isOpen}
          closeAfterTransition
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
          }}
        >
          <Fade in={this.state.isOpen}>
            <div className={classes.paper}>
                <p id="transition-modal-description">{this.state.errMsg}</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    listMovie: state.listMovieReducer.data,
    errorDelete: state.listMovieReducer.errorDelete,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    listMovieApi: () => dispatch(actListMovieApi()),
    deleteFilmAPI: (id) => {
      dispatch(actMovieListDeleteFailed(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilmManeger))