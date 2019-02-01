import React, { Component } from "react";
import { Redirect } from "react-router";
import classNames from "classnames";
import {
  MdHome as HomeIcon,
  MdNotifications as NotificationIcon,
  MdMail as MailIcon
} from "react-icons/md";
import "./HeaderNav.css";

class HeaderNavItem extends Component {
  state = {
    redirect: false
  };
  handleOnClick = (onSelect, tab) => {
    onSelect(tab);
    this.setState({ redirect: true }, function() {
      this.setState({ redirect: false });
    });
  };
  render() {
    const { children, selected, tab, iconType, onSelect, to } = this.props;
    const icon = iconType ? React.createElement(iconType) : null;
    if (this.state.redirect) {
      return <Redirect push to={`/${to}`} />;
    }
    return (
      <div
        className={classNames("HeaderNavItem", {
          active: selected === tab
        })}
        onClick={() => {
          this.handleOnClick(onSelect, tab);
        }}
      >
        <div className="icon">{icon}</div>
        <div className="text">{children}</div>
      </div>
    );
  }
}

const HeaderNav = ({ tab, onSelect }) => {
  return (
    <div className="HeaderNav">
      <HeaderNavItem
        to=""
        iconType={HomeIcon}
        tab="home"
        selected={tab}
        onSelect={onSelect}
      >
        Home
      </HeaderNavItem>
      <HeaderNavItem
        to="notification"
        iconType={NotificationIcon}
        tab="notification"
        selected={tab}
        onSelect={onSelect}
      >
        Notification
      </HeaderNavItem>
      <HeaderNavItem
        to="message"
        iconType={MailIcon}
        tab="message"
        selected={tab}
        onSelect={onSelect}
      >
        Message
      </HeaderNavItem>
    </div>
  );
};

export default HeaderNav;
