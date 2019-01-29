import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    const { left,right,middle } = this.props;
    return (
      <div className="Header">
        <div className="side left">{left}</div>
        <div className="middle">{middle}</div>
        <div className="side right">{right}</div>
      </div>
    );
  }
}

export default Header;