import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './map.module.css';
import Spinner from '../../../../components/UI/Spinner/spinner';
import { renderToStaticMarkup } from 'react-dom/server';
//map related imports
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers, withState } from 'recompose';
import MarkerIcon from '../../../UI/CarSvgIcon/carSvgIcon';
import MarkerComponent from './Marker/marker';
import {} from '../../../..'

class MapComponent extends Component {
    state = {
        clickedArea: [],
        // markers: []
    }
    onClickAreaMarkerHandler = (area) => {
        this.setState({ clickedArea: area })
    }
    // getIcon = (perc) => {
    //     return <MarkerIcon perc />
    // }
    render() {

        const MapWithAMarkerClusterer = compose(
            withState('clusterIcon', 'setClusterIcon', ''),
            withState('percentage', 'setPercentage', ''),
            withProps({
                googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=APIKEY`,
                loadingElement: <Spinner />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />,
                finalIcon: `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(<MarkerIcon perc={50} />))}`
            }),
            withHandlers({
                onMarkerClustererClick: () => (markerClusterer) => {
                    const clickedMarkers = markerClusterer.getMarkers();
                    console.log(`Current clicked markers length: ${clickedMarkers}`)
                    console.log(clickedMarkers)
                },
                myOnClusteringBegin: ({ setClusterIcon, setPercentage }) => (markerClusterer) => {
                    const childMarkers = markerClusterer.getMarkers();
                    let childTotalPercent = 0;
                    childMarkers.map(marker => {
                        return childTotalPercent += +marker.title;
                    })
                    const childMarkersAvgPercentage = (childTotalPercent / childMarkers.length);
                    setPercentage(childMarkersAvgPercentage);
                    setClusterIcon(`data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(<MarkerIcon perc={childMarkersAvgPercentage} />))}`)
                },
                myOnClusteringEnd: ({ setClusterIcon, setPercentage }) => (markerClusterer) => {
                    const childMarkers = markerClusterer.getMarkers();
                    let childTotalPercent = 0;
                    childMarkers.map(marker => {
                        return childTotalPercent += +marker.title;
                    })
                    const childMarkersAvgPercentage = (childTotalPercent / childMarkers.length);
                    setPercentage(childMarkersAvgPercentage);
                    setClusterIcon(`data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(<MarkerIcon perc={childMarkersAvgPercentage} />))}`)
                },
                myCalculator: props => () => {
                    var index = 0;
                    // console.log("saadas" + props.percentage)
                    var count = props.percentage
                    // const clickedMarkers = markerClusterer.getMarkers();
                    // console.log("calc:  " + count)
                    return {
                        text: count,
                        index: index
                    };
                },
            }),
            withScriptjs,
            withGoogleMap)(props => {

                return <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{ lat: -37.840935, lng: 144.946457 }}
                    defaultOptions={{ styles: classes.mapStyles }}
                >
                    <MarkerClusterer
                        onClick={props.onMarkerClustererClick}
                        // icon={MarkerIcon}
                        // imagePath={props.finalIcon}
                        averageCenter
                        enableRetinaIcons
                        gridSize={60}
                        onClusteringBegin={props.myOnClusteringBegin}
                        onClusteringEnd={props.myOnClusteringEnd}
                        calculator={props.myCalculator}
                        styles={[
                            {
                                url: props.clusterIcon,
                                height: 100,
                                width: 100
                            }
                        ]}
                    >
                        {this.props.parkingAreas.map(area => {
                            return <MarkerComponent key={area._id} area={area} />
                        })}
                    </MarkerClusterer>
                </GoogleMap>
            });
        return (
            <div style={{ width: "100vw - 200px", height: "80vh" }}>
                <MapWithAMarkerClusterer />
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        parkingAreas: state.parkingArea.parkingAreas
    }
}
export default connect(mapStateToProps)(MapComponent);