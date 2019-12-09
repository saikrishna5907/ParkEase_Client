import React, { Fragment } from 'react';
// import HomePageCarousel from './Carousel/carousel';
import BgImage from '../../assets/bgimg2.jpg';
import classes from './homePage.module.css';
import { Col, Row } from 'react-bootstrap';
const homePage = () => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <img
                        className={classes.bgImage}
                        src={BgImage}
                        alt="Background"
                    />
                </Col>
            </Row>
        </Fragment>
    );
}

export default homePage;