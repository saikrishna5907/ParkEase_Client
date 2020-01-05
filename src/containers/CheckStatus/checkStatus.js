import React, { Component, Fragment } from 'react';
// import classes from './checkStatus.module.css';
import SearchForm from '../../components/CheckStatus/SearchForm/searchForm';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import classes from './checkStatus.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';
import MyParkingStatusInfo from '../../components/CheckStatus/MyParkingStatusInfo/myParkingStatusInfo';
class CheckStatus extends Component {
    state = {
        inputValue: '',
    }
    onSearchBtnClick = async (inputValueFromChildCom) => {
        await this.setState({ inputValue: inputValueFromChildCom });
        // console.log(this.state.inputValue);
        this.props.onFetchMyParkingStatus(this.state.inputValue, localStorage.getItem('token'));
    }
    render() {
        let contentToDisplay = (
        <Container>
            <h3 className={classes.h3}>Please select aleast one Parking Area to view details.</h3>
        </Container>);
        if(this.props.loading){
            contentToDisplay=<Spinner />
        }
        if (this.props.myParkingStatus.length > 0) {
            contentToDisplay = <MyParkingStatusInfo info={this.props.myParkingStatus} />
        }
        return (
            <Fragment>
                <SearchForm onBtnClick={this.onSearchBtnClick}/>
                {contentToDisplay}
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        myParkingStatus: state.checkStatus.myParkingStatus,
        error: state.checkStatus.error,
        loading: state.checkStatus.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchMyParkingStatus: (vehicleId, token) => dispatch(actions.fetchMyParkingStatus(vehicleId, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckStatus);