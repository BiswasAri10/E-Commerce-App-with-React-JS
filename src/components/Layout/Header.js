import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <NavLink exact to="/" activeClassName={classes.activeLink}>
            HOME
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/store" activeClassName={classes.activeLink}>
            STORE
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/about" activeClassName={classes.activeLink}>
            ABOUT
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/contact" activeClassName={classes.activeLink}>
            CONTACT US
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
