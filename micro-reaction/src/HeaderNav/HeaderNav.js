import React from 'react';
import classNames from 'classnames';
import './HeaderNav.css';

const HeaderNavItem = ({ children, selected, tab, iconType, onSelect }) => {
  return (
    <div
      className={classNames('HeaderNavItem', {
        active: selected === tab,
      })}
      onClick={() => onSelect(tab)}
    >
      <div className="text">{children}</div>
    </div>
  );
};

const HeaderNav = ({ tab, onSelect }) => {
  return (
    <div className="HeaderNav">
      <HeaderNavItem
        tab="home"
        selected={tab}
        onSelect={onSelect}
      >
        Home
      </HeaderNavItem>
      <HeaderNavItem
        tab="notification"
        selected={tab}
        onSelect={onSelect}
      >
        Notification
      </HeaderNavItem>
      <HeaderNavItem
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