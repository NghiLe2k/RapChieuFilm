import React, { Component } from "react";
import { actLoginApi } from "./modules/action";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader";
import "./../../../index.css";
class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: "",
    };
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  renderNoti = () => {
    const { error } = this.props;
    if (error) {
      return <div className="alert alert-danger">{error.response.data}</div>;
    }
  };

  render() {
    const { loading } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="AuthPage">
        <div className="container ">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h3>AuthPage</h3>
              <form onSubmit={this.handleLogin}>
                {this.renderNoti()}
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="taiKhoan"
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="matKhau"
                    onChange={this.handleOnChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.err,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    login: (user, history) => {
      dispatch(actLoginApi(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(AuthPage);
