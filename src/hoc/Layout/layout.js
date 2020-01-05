import React, { Fragment,Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import FooterComponent from '../../components/UI/Footer/footer';
import {connect} from 'react-redux';
import classes from './layout.module.css';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHanlder = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHanlder = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        return (
            <Fragment>
                <Toolbar
                    isAuth= {this.props.isAuthenticated}
                    toggleClicked={this.sideDrawerToggleHanlder}
                />
                <SideDrawer
                    isAuth= {this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHanlder}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <FooterComponent />
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);