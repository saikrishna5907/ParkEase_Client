import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Cluster } from 'react-mapbox-gl';
import {ReactMapboxGlCluster} from 'react-mapbox-gl-cluster';
import { connect } from 'react-redux';
import classes from './map.module.css';
import MarkerIcon from '../../../../assets/car.svg';
const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoic2Fpa3Jpc2huYTU5IiwiYSI6ImNrM3Y1eGkxaTBrcTczbW8xdWt4ZHVkeDUifQ.QMLxBJQlZsTCg1adq_9kxg'
});
const mapProps = {
    center: [-95.7129, 37.0902],
    zoom: [3],
    style: 'mapbox://styles/mapbox/streets-v8',
  };
export class MapComponent extends Component {
    clusterMarker = (coordinates) => (
        <Marker coordinates={coordinates} style={classes.clusterMarker}>
            C
        </Marker>
    );
    getEventHandlers() {
        return {
            onClick: (properties, coords, offset) =>
                console.log(`Receive event onClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
            onMouseEnter: (properties, coords, offset) =>
                console.log(`Receive event onMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
            onMouseLeave: (properties, coords, offset) =>
                console.log(`Receive event onMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
            onClusterClick: (properties, coords, offset) =>
                console.log(`Receive event onClusterClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
        };
    }
    render() {
        // let markers;
        let geoJsonFormatData = [];
        this.props.parkingAreas.map(area => {
            let occupiedPercentage = (area.noOfOccupiedSpots / area.totalParkingSpots) * 100
            // return <Feature
            //     key={area._id}
            //     coordinates={[area.longitude, area.latitude]}
            //     properties={{ areaId: area._id, occupiedPercentage }}
            // />
            geoJsonFormatData.push({
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                            occupiedPercentage
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [area.longitude, area.latitude]
                        }
                    }
                ]
            });
            console.log(geoJsonFormatData)
            return <Marker
                key={area._id}
                coordinates={[area.longitude, area.latitude]}
                anchor="bottom" >
                <img src={MarkerIcon} alt="" />
            </Marker >
        })
        return (
            <Map {...mapProps} onStyleLoad={this.onStyleLoad}>
                <ReactMapboxGlCluster data={geoJsonFormatData} {...this.getEventHandlers()} />
            </Map>
        );
        // return (
        //     <Map
        //         style="mapbox://styles/mapbox/streets-v11"
        //         center={[144.946457, -37.840935]}

        //         containerStyle={{
        //             height: '80vh',
        //             width: '100%',
        //         }}
        //     >
        //         {/* <Layer
        //             type="circle"
        //             id="marker"
        //             paint={{
        //                 'circle-color': "#ff5200",
        //                 'circle-stroke-width': 1,
        //                 'circle-stroke-color': "#fff",
        //                 'circle-stroke-opacity': 1
        //             }}
        //         > */}
        //         {/* <Cluster ClusterMarkerFactory={this.clusterMarker}>
        //             {spotsinAreaByFloor}
        //         </Cluster> */}
        //         {/* </Layer> */}
        //         {/* <Popup
        //             coordinates={[ 144.974567,-37.749218]}
        //             offset={{
        //                 'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
        //             }}>
        //             <h1>Popup</h1>
        //         </Popup> */}
        //     </Map >
        // );
    };
}
