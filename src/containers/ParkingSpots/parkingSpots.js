import React, { Component, Fragment } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import * as actions from '../../store/actions/index';
import classes from './parkingSpots.module.css';
import Spinner from '../../components/UI/Spinner/spinner';
import ParkingSpotsByFloor from './ParkingSpotsByFloor/parkingSpotByFloor';
const ToReflectMarginforTexField = withStyles({
    root: {
        marginBottom: '25px'
    }
})(TextField);
class ParkingSpots extends Component {
    state = {
        areaName: '',
        loading: true,
        floorName: '',
        isBtnClicked: false,
        contentToDisplay: 'Please Select the Level Name to view Parking Spots'
    }

    componentDidMount() {
        this.props.onFetchParkingsByAreaName(this.state.areaName, this.state.floorName)
    }
    componentWillMount() {
        this.setState({ areaName: this.props.match.params.areaName })
    }
    onChangeSelectedFloorNameHandler = (event) => {
        this.setState({ floorName: event.target.value });
    }
    onSearchBtnClickHandler = () => {
        this.props.onFetchParkingsByAreaName(this.state.areaName, this.state.floorName);
        this.setState({ isBtnClicked: true });
        console.log('selcted:  ' + this.state.floorName);
    }
    render() {
        const HelperText = `Select the Level Name in ${this.state.areaName} parking Area`
        const searchBar = <form noValidate autoComplete="off">
            {/* give a margin later for the below div */}
            <div className={classes.AllFields}>
                <ToReflectMarginforTexField
                    id="outlined-select-currency"
                    select
                    value={this.state.floorName}
                    onChange={this.onChangeSelectedFloorNameHandler}
                    label="Level Name"
                    helperText={HelperText}
                    margin="normal"
                    variant="outlined"
                >
                    {this.props.parkingAreaFloorNames.map(floorName => (
                        <MenuItem key={floorName} value={floorName}>
                            {floorName.toUpperCase()}
                        </MenuItem>
                    ))}
                </ToReflectMarginforTexField>
                <Button
                    className={classes.SearchBtn}
                    onClick={this.onSearchBtnClickHandler}
                >
                    Search
                </Button>
            </div>
        </form>
        let spots = <Spinner />

        if (!this.props.loading) {
            spots = <h3 className={classes.h3}>{this.state.contentToDisplay}</h3>;
        }
        if (this.state.floorName) {
            spots = <ParkingSpotsByFloor
                isBtnClicked={this.state.isBtnClicked}
                areaName={this.state.areaName}
                floorName={this.state.floorName}
                parkingSpotsByfloorAndAreaName={this.props.parkingSpotsByfloorAndAreaName}
            />
        }
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h2> {this.state.areaName}</h2>
                            {searchBar}
                            {spots}
                        </Col>
                    </Row>
                    {/* <Row className={classes.mapHeightResponsive}>
                        <Col>
                            <MapWithDetails
                                floorName = {this.state.floorName}
                            />
                        </Col>
                    </Row> */}

                </Container>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        parkingSpotsByfloorAndAreaName: state.parkingSpot.parkingSpotsByfloorAndAreaName,
        parkingAreaFloorNames: state.parkingSpot.parkingAreaFloorNames,
        loading: state.parkingSpot.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchParkingsByAreaName: (areaName, floorName) => dispatch(actions.fetchParkingSpotsByAreaName(areaName, floorName))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ParkingSpots);