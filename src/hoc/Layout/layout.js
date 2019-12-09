import React, { Fragment } from 'react';
import NavbarComponent from '../../components/UI/NavBar/navbar';
import FooterComponent from '../../components/UI/Footer/footer';
import classes from './layout.module.css';
const layout = (props) => (
    <Fragment>
        <NavbarComponent />
            <main className={classes.Content}>
                {props.children}
            </main>
        <FooterComponent />
    </Fragment>
);

export default layout;