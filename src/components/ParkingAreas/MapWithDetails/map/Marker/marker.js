import React, { Component, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button, Modal } from 'react-bootstrap'
import {Marker}from 'react-google-maps';
import MarkerIcon from '../../../../UI/CarSvgIcon/carSvgIcon';
class MarkerComponent extends Component {
    state = {
        clickedArea: [],
        showModal: false
    }
    handleClose = () => {
        this.setState({ showModal: false })
    }
    handleShow = () => {

    }
    onClickAreaMarkerHandler = (area) => {
        this.setState({ showModal: true });
        this.setState({ clickedArea: area })
    }
    render() {
        let perc = 100 - ((this.props.area.noOfOccupiedSpots / this.props.area.totalParkingSpots) * 100);
        const iconString = encodeURIComponent(renderToStaticMarkup(<MarkerIcon perc={perc} />));
        const finalIcon = `data:image/svg+xml,${iconString}`;
        return (
            <Fragment>
                <Marker
                    position={{
                        lat: +this.props.area.latitude,
                        lng: +this.props.area.longitude
                    }}
                    //to send the perc spots are available
                    title={JSON.stringify(perc)}
                    onClick={() => this.onClickAreaMarkerHandler(this.props.area)}
                    icon={{
                        url: finalIcon
                    }}
                >
                </Marker>
                {
                    this.state.clickedArea !== null && this.state.clickedArea.name && (
                        <Modal show={this.state.showModal} onHide={this.handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.clickedArea.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>Available Parking Spots: {this.state.clickedArea.totalParkingSpots - this.state.clickedArea.noOfOccupiedSpots}</h5>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                 </Button>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Navigate To Area
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        // <InfoWindow
                        //     onCloseClick={() => this.onClickAreaMarkerHandler(null)}
                        //     position={{
                        //         lat: +this.state.clickedArea.latitude,
                        //         lng: +this.state.clickedArea.longitude
                        //     }}
                        // >
                        //     <div>
                        //         <h2>{this.state.clickedArea.name}</h2>
                        //         <p>occupied spots: {this.state.clickedArea.noOfOccupiedSpots}</p>
                        //     </div>
                        // </InfoWindow>
                    )
                }
            </Fragment >
        );
    }
}
export default MarkerComponent;