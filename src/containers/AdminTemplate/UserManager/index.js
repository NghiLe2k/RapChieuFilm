import React, { Component } from "react";
import Users from "./../../../components/Users/index";
import { actUserManagerApi } from "./modules/action";
import { connect } from "react-redux";
import "./../../../index.css";
import UserPage from "../UserPage";
import { actUserListDeleteAPI } from "./modules/action";
import Axios from "axios";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import _ from 'lodash';
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

const mockUser = {
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  email: "",
  soDt: "",
  maNhom: "",
  maLoaiNguoiDung: "",
};
class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      data: {},
      isOpen: false,
      errMsg: "",
      validateMsg: "",
    };
    this.closeButton = React.createRef();
  }

  componentDidMount() {
    this.props.userManagerApi();
  }
  handleDeleteUser = (taiKhoan) => {
    this.props.deleteUserAPI(taiKhoan);
    this.openMessage();
  };
  // handleEditUser = (user) => {
  //   <EditUser user={user} />;
  // };

  getSelectedUser = (data) => {
    this.setState({
      user: data,
    });
  };
  renderHMTL = () => {
    const { listUser } = this.props;
    if (listUser && listUser.length > 0) {
      return listUser.map((User) => {
        return (
          <Users
            user={User}
            key={User.index}
            handleDeleteUser={this.handleDeleteUser}
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
      alert("Can not delete this user at the moment");
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
    const { data } = this.state;
    let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
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
        if (err) {
          this.setState({
            validateMsg: 'Sai mã nhóm'
          })
        }
      });
  };

  getInputData = (label, value) => {
    const { user } = this.state;
    this.setState({
      data: {
        ...user,
        [label]: value,
      },
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    })
    this.closeButton.current.click();
  }

  render() {
    const { isEdit, data, errMsg } = this.state;
    const disabled = 
      !_.isEmpty(data.email) &&
      !_.isEmpty(data.hoTen) &&
      !_.isEmpty(data.maLoaiNguoiDung) &&
      !_.isEmpty(data.maNhom) &&
      !_.isEmpty(data.matKhau) &&
      !_.isEmpty(data.soDt) &&
      !_.isEmpty(data.taiKhoan) ? false : true;
    const { classes } = this.props;
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
                <UserPage
                  user={isEdit ? this.state.user : mockUser}
                  isEdit={isEdit}
                  getInputData={this.getInputData}
                  validateMsg={this.state.validateMsg}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  ref={this.closeButton}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={isEdit && this.handleEdit}
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
          add user
        </button>
        <input
          type="text"
          class="form-control"
          placeholder="Tên nhân viên"
          id="searchName"
        ></input>
        <table className="container">
          <thead>
            <tr>
              <th>UserName</th>
              <th>FullName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>PassWord</th>
              <th>Chức</th>
              <th>năng</th>
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
                <p id="transition-modal-description">{errMsg}</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.userManagerReducer.loading,
    listUser: state.userManagerReducer.data,
    errorDelete: state.userManagerReducer.errorDelete,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userManagerApi: () => dispatch(actUserManagerApi()),
    deleteUserAPI: (id) => {
      dispatch(actUserListDeleteAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListUser))