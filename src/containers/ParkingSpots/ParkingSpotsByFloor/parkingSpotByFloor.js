import React, { Fragment, Component } from 'react';
import classes from './parkingSpotByFloor.module.css';
import FloorLayout from '../../../components/ParkingSpots/Floor/floor';

class ParkingSpotsByFloor extends Component {
    // shouldComponentUpdate(prevProps){
    //     return  prevProps.floorName !== this.props.floorName
    // }
    render() {
        const floorLayout = this.props.parkingSpotsByfloorAndAreaName.map(spot => {
            return <FloorLayout key={spot._id} floorName={this.props.floorName} isOccupied={spot.isSpotVacant} />
        })
        const content = (<div style={{marginBottom: '50px'}}>
            <h4>{this.props.floorName}</h4>
            <div className={classes.floorLayout}>
                {floorLayout}
            </div>
        </div>);
        const toHidecontentwhenFloorSelectedButNotClicked = this.props.isBtnClicked ? content : null
        return (
            <Fragment>
                {toHidecontentwhenFloorSelectedButNotClicked}
            </Fragment>

        );
    }
}
export default ParkingSpotsByFloor;