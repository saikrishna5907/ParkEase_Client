import React, { Fragment } from 'react';
import SpotCards from '../SpotCard/spotCard';

const FloorLayout = props => {
    let contentToDisplay = "Level Name not selected"
    if(props.floorName){
        contentToDisplay = <SpotCards isOccupied={props.isOccupied} />
    }
    return (
        <Fragment>
                {contentToDisplay}
        </Fragment>
    );
}
export default FloorLayout;