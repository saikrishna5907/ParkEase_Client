import React from 'react';
import {Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classes from './navbarItem.module.css';
const navbarItem = (props) => (
    <Nav className={classes.navbarItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
            className = {classes.navbarItem}
        >
            {props.children}
        </NavLink>
    </Nav>
);

export default navbarItem;