import React from 'react';
import classes from './toolbar.module.css'
import Logo from '../../UI/Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavBar/navigationItems';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuth}/>
        </nav>
    </header>
);
export default toolbar;