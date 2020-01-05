import React, { Fragment } from 'react';
import NavBarItem from './NavigationItem/navigationItem';
import classes from './navigationItems.module.css';
// import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const navigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavBarItem link="/" exact>Home</NavBarItem>
            <NavBarItem link="/howParkEaseWors">How ParkEase works</NavBarItem>
            <NavBarItem link="/downloadApp">Download app</NavBarItem>
            {props.isAuthenticated ?
                (<Fragment>
                    <NavBarItem link="/parkingAreas">Parking Areas</NavBarItem>
                    <NavBarItem link="/checkStatus">My Parking Status</NavBarItem>
                </Fragment>)
                : null
            }
            <NavBarItem link="/about">About</NavBarItem>
            <NavBarItem link="/contact">Contact</NavBarItem>
            {props.isAuthenticated ? <Link to="/logout" className={classes.loginBtn}>Sign out</Link> : null}
            {!props.isAuthenticated ?
                (<Fragment>
                    <Link to="/auth" className={classes.loginBtn}>Login</Link>
                    <Link to="/signUp" className={classes.signUpBtn}>Sign Up</Link>
                </Fragment>)
                : null
            }
        </ul>
    );
}
export default navigationItems;