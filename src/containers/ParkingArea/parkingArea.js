import React, { Fragment, Component } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import classes from './parkingArea.module.css';
import ParkingAreaCard from '../../components/ParkingAreas/Card/card';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';
import MapWithDetails from '../../components/ParkingAreas/MapWithDetails/mapWithDetails';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from 'react-bootstrap';

import { Input, FormControl, InputLabel, ListItemText, Select, Checkbox } from '@material-ui/core';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            errorMsg: ''
        },
    },
};
class ParkingArea extends Component {
    state = {
        loading: true,
        selectedAreas: [],
        // isBtnClicked: false,
        btnClickedButNotSelected: false
    }
    componentDidMount() {
        this.props.onFetchParkingAreas(localStorage.getItem('token'));
    }
    // componentWillUpdate(prevState){
    //     console.log(this.state.selectedAreas !== prevState.selectedAreas);
    //     return this.state.selectedAreas !== prevState.selectedAreas
    // }
    handleChange = event => {
        this.setState({ selectedAreas: event.target.value });
    };

    searchBtnClickHandler = () => {
        // this.setState({ isBtnClicked: true });
        if (this.state.selectedAreas.length === 0) {
            this.setState({ btnClickedButNotSelected: true });
            this.setState({ errorMsg: 'Please Select At least one ' })

        } else
            this.setState({ btnClickedButNotSelected: false });
        this.props.onFetchSelectedParkingAreas(this.state.selectedAreas, localStorage.getItem('token'));
    }
    render() {
        let form = (
            <div className={classes.AllFields}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-checkbox-label">Please Select the Parking Areas</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={this.state.selectedAreas}
                        onChange={this.handleChange}
                        input={<Input />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {this.props.parkingAreas.map(parkingArea => (
                            <MenuItem key={parkingArea.name} value={parkingArea.name}>
                                <Checkbox checked={this.state.selectedAreas.indexOf(parkingArea.name) > -1} />
                                <ListItemText primary={parkingArea.name} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        className={classes.SearchBtn}
                        onClick={this.searchBtnClickHandler}
                    >
                        Search
                </Button>
                </FormControl>
            </div>
        );
        let parkingAreas = (
            <Container>
                <h3 className={classes.h3}>Please select aleast one Parking Area to view details.</h3>
            </Container>
        )
        if (this.props.loading) {
            parkingAreas = <Spinner />
        }

        // parkingAreas =  <h3 className={classes.h3}>{this.state.contentToDisplay}</h3>;
        if (!this.props.loading && !this.state.btnClickedButNotSelected && this.state.selectedAreas.length > 0) {
            parkingAreas = this.props.parkingAreasByName.map(parkingArea => {
                return (
                    <div
                        style={{ /*margin: '50px 50px'*/ padding: '30px' }}
                        key={parkingArea.id}
                    >
                        <Card style={{ boxSizing: 'borderBox', border: 'none' }}>
                            <Row>
                                <Col>
                                    <ParkingAreaCard parkingArea={parkingArea} />
                                </Col>
                            </Row>
                        </Card>
                    </div>

                )
            })
        }
        return (
            <Fragment>
                <Container>
                    <div className={classes.SearchBar}>
                        <h1 style={{ padding: '20px' }}>Where would you like to Park today!</h1>
                        {form}
                    </div>
                    {parkingAreas}
                    <Row className={classes.mapHeightResponsive}>
                        <Col>
                            <MapWithDetails
                                floorName={this.state.floorName}
                            />
                        </Col>
                    </Row>
                </Container>


            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        parkingAreas: state.parkingArea.parkingAreas,
        parkingAreasByName: state.parkingArea.parkingAreasByName,
        loading: state.parkingArea.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchParkingAreas: (token) => dispatch(actions.fetchParkingAreas(token)),
        onFetchSelectedParkingAreas: (listOfSelectedAreas, token) => dispatch(actions.fetchParkingAreasByName(listOfSelectedAreas, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ParkingArea); 