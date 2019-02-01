import React from "react";
import classNames from "classnames";
import {
  MdHome as HomeIcon,
  MdNotifications as NotificationIcon,
  MdMail as MailIcon
} from "react-icons/md";
import "./HeaderNav.css";

const HeaderNavItem = ({ children, selected, tab, iconType, onSelect }) => {
  const icon = iconType ? React.createElement(iconType) : null;
  return (
    <div
      className={classNames("HeaderNavItem", {
        active: selected === tab
      })}
      onClick={() => onSelect(tab)}
    >
      <div className="icon">{icon}</div>
      <div className="text">{children}</div>
    </div>
  );
};

const HeaderNav = ({ tab, onSelect }) => {
  return (
    <div className="HeaderNav">
      <HeaderNavItem
        iconType={HomeIcon}
        tab="home"
        selected={tab}
        onSelect={onSelect}
      >
        Home
      </HeaderNavItem>
      <HeaderNavItem
        iconType={NotificationIcon}
        tab="notification"
        selected={tab}
        onSelect={onSelect}
      >
        Notification
      </HeaderNavItem>
      <HeaderNavItem iconType={MailIcon} tab="message" selected={tab} onSelect={onSelect}>
        Message
      </HeaderNavItem>
    </div>
  );
};

export default HeaderNav;
