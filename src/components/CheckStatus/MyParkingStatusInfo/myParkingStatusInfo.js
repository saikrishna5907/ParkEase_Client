import React, { Fragment, Component } from 'react';
import classes from './myParkingStatusInfo.module.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import {getMillSecondsTimeInHMSFormat} from '../../../utility/utility';
class MyParkingStatusInfo extends Component {
   
    render() {

        let infoDiv = this.props.info.map(status => {
            let createdAtDate = new Date(status.createdAt);
            //to add an hour to the createdDate
            const parkingExpTime = createdAtDate.getTime() + status.parkingSpot.allowedTime.charAt(0) * 3600000;
            const payedUntil = new Date(parkingExpTime);
            

            let howMuchExceeded = getMillSecondsTimeInHMSFormat(payedUntil);
            const exceededFormat = howMuchExceeded.hours + ' h : ' +howMuchExceeded.minutes + ' m : '+ howMuchExceeded.seconds + ' sec';
            let exceededTimeOrUnderTime;
            let isExceeded = false;
            //still got parking time
            if (parkingExpTime >= new Date().getTime()) {

                exceededTimeOrUnderTime = <h4>Payed Until &mdash; {payedUntil.toLocaleTimeString()}</h4>
            }
            //exceeded
            else {
                isExceeded = true;
                exceededTimeOrUnderTime = <h4>Parking Exceeded By &mdash; {exceededFormat}</h4>
            }

            return <Card key={status._id} className={classes.cardStyle}>
                <Card.Header>Owned By :  {status.vehicleOwnedBy.firstName + '  ' + status.vehicleOwnedBy.lastName}</Card.Header>
                <Card.Body>
                    <Card.Title>

                    </Card.Title>
                    <Row>
                        <Col>
                            <h2>Parked Area :  {status.parkingSpot.parkingArea.name}</h2>
                            <Divider style={{ backgroundColor: '#B2B2CA' }} />
                            <div>
                                {status.parkingSpot.parkingArea.noOfFloors > 0 ?
                                    <h3>
                                        Parked Level :  {status.parkingSpot.floorName}
                                    </h3> : null
                                }
                                <Divider style={{ backgroundColor: '#B2B2CA' }} />
                                <h4>Parked At Spot :  {status.parkingSpot.spotNumber}</h4>
                                <Divider style={{ backgroundColor: '#B2B2CA' }} />
                                <h5>Vehicle REGO Number :  {status.parkedVehicleRego.toUpperCase()}</h5>
                                <Divider style={{ backgroundColor: '#B2B2CA' }} />
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <h4>Parking Start Time &mdash; {createdAtDate.toLocaleTimeString()}</h4>
                                <p> {createdAtDate.toDateString()}</p>
                                {/* <h4>Payed until : {payedUntil.toLocaleTimeString()}</h4> */}
                                {exceededTimeOrUnderTime}
                                {/* {isExceeded ? <p>{exceededFormat}</p> : <p>{payedUntil.toLocaleDateString()}</p>} */}
                            </div>

                            <Divider style={{ backgroundColor: '#B2B2CA' }} />
                            <br />
                            <Row>
                                <Col md="8">
                                    {isExceeded ? <p>Pay Here ---></p> : <p>Would you like to Extend the Parking ? </p>}
                                </Col>
                                <Col>
                                    <Button variant="success">
                                        {isExceeded ? 'Pay Now' : 'Pay To Extend'}
                                    </Button>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted"></Card.Footer>
            </Card>
        })
        return (
            <Fragment>
                <Container className={classes.mainDiv}>
                    {infoDiv}
                </Container>
            </Fragment>
        );
    }
}
export default MyParkingStatusInfo;