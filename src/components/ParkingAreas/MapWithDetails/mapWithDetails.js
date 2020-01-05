import React, { Fragment } from 'react';

import MapComponent from './map/map';
// import { Row, Col } from 'react-bootstrap';
// import classes from './mapWithDetails.module.css';
const mapWithDetails = props => {

    return (
        <Fragment>
            <p>
                Description about the map  will be added later as cards
            </p>
            <MapComponent />
        </Fragment >
    );
}
export default mapWithDetails;