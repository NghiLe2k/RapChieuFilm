import React, { Component } from "react";
import Slider from "react-slick";
// import { connect } from "react-redux";
// import Movie from "../../../components/Movie";
import "./../../../index.css";
import { actListMovieApi } from "./modules/actions";
import { connect } from "react-redux";
import Movie from "../../../components/Movie";
import { actListMovieScheduleApi } from "../TheoNgay/modules/actions";
import { actListCumRapApi } from "../ThongTinRap/modules/actions";
import LichPhim from "../../../components/LichPhim";
import News from "../../../components/News";
import Carousel from "../../../components/Carousel/index";

class DangChieu extends Component {
  componentDidMount() {
    this.props.listMovieApi();
    this.props.listMovieScheduleAPI();
  }
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  renderHMTL = () => {
    const { listMovie } = this.props;
    if (listMovie && listMovie.length > 0) {
      return listMovie.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 500,
      rows: 2,
    };
    return (
      <div>
        <Carousel></Carousel>
        <div className="container mt-5 " id="lichChieu">
          <h2>Đang Chiếu</h2>
          <Slider ref={(c) => (this.slider = c)} {...settings}>
            {this.renderHMTL()}
          </Slider>
          <div style={{ textAlign: "center" }}>
            <button className="button previous" onClick={this.previous}>
              Prev
            </button>
            <button className="button next" onClick={this.next}>
              Next
            </button>
          </div>
        </div>
        <LichPhim></LichPhim>
        <News></News>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    listMovie: state.listMovieReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    listMovieApi: () => dispatch(actListMovieApi()),
    listMovieScheduleAPI: () => dispatch(actListMovieScheduleApi()),
    listCumRapApi: (id) => dispatch(actListCumRapApi(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DangChieu);
