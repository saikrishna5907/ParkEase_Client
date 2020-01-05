import React, { Fragment, Component } from 'react';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classes from './card.module.css';
class CardComponent extends Component {
   
    render() {

        const cardOutput =
            (
                <Card className={classes.Card}>
                    {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                    <Card.Body>
                        <Card.Title>{this.props.parkingArea.name}</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                            </Card.Text>
                        <h3>Longitude: {this.props.parkingArea.longitude}</h3>
                        <h3>Latitude: {this.props.parkingArea.latitude}</h3>
                        <h3>total spots: {this.props.parkingArea.totalParkingSpots}</h3>
                        <h3>Occupied Spots: {this.props.parkingArea.noOfOccupiedSpots}</h3>
                    </Card.Body>
                    <Card.Footer>
                        <Button className={classes.buttonStyle} >

                            <NavLink
                                to={`/${this.props.parkingArea.name}/parkingSpots`}
                            >
                                <span>Parking Spots In {this.props.parkingArea.name}</span>
                            </NavLink>
                        </Button>
                    </Card.Footer>
                </Card>

            );


        return (
            <Fragment>
                <CardDeck>
                    {cardOutput}
                </CardDeck>
            </Fragment>
        );
    }

}
export default CardComponent;