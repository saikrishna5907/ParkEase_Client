import React from 'react'
import carLogo from '../../../assets/car.svg';
import classes from './Logo.module.css';
const logo = (props) => (
    <div className={classes.Logo}>
        <img src= {carLogo} alt="Logo"></img>
    </div>
);
export default logo;