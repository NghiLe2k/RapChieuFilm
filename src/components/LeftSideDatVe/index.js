import React, { Component } from 'react';
import './index.scss';
class LeftSideDatVe extends Component {
    render() {
        const { hinhAnh } = this.props;
        return (
            <div className="left-side col-1">
                <img src={hinhAnh} />
            </div>
        );
    }
}

export default LeftSideDatVe;