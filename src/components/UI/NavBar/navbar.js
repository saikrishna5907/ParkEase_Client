import React, { Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import NavBarItem from './NavBarItem/navbarItem';
import classes from './navbar.module.css';
const navbar = props => {
    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/">ParkEase</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ul className={classes.menuNav}>
                        <Nav>
                            <NavBarItem link="/" exact>Home</NavBarItem>
                            <NavBarItem link="/parkingAreas">Parking Areas</NavBarItem>
                            <NavBarItem link="/myParkingStatus">Check Parking Status</NavBarItem>
                            <NavBarItem link="/about">About</NavBarItem>
                            <NavBarItem link="/contact">Contact</NavBarItem>
                        </Nav>
                    </ul>
                    <Nav>
                        <NavBarItem link="/register">
                            Register
                        </NavBarItem>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </Fragment>
    );
}
export default navbar;