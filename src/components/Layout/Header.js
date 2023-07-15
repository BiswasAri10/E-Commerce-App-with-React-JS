import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import Cart from "../Cart/Cart";

const Header = () => {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <NavLink exact to="/" activeClassName={classes.activeLink}>
            Home
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/store" activeClassName={classes.activeLink}>
            Store
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/about" activeClassName={classes.activeLink}>
            About
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <Cart />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
