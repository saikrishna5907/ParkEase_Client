import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import classes from './spotCard.module.css';
const spotCard = props => {
    return (
        <Fragment>
            <Card className={classes.SpotCard}>
                {props.isOccupied?<h6>Show imageassssssssssssssssss</h6> : null}
            </Card>
        </Fragment>
    );
}
export default spotCard;