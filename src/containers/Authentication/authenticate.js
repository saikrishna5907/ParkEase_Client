import React, { Component, Fragment } from 'react';
import LoginForm from '../../components/Login/LoginForm/loginForm';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/spinner';
import {Redirect} from 'react-router-dom';
class AuthenticateComponent extends Component {
    state = {
        email: '',
        password: ''
    }
    onEmailChange = async event => {
        const value = event.target.value;
        await this.setState(() => ({ email: value }));
    }
    onPasswordChange = async event => {
        const value = event.target.value;
        await this.setState(() => ({ password: value }));
    };
    onLoginBtnHandler = () => {
        this.props.onAuthenticate(this.state.email, this.state.password);
    }
    componentDidMount(){
        if( this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectPath();
        }
    }
    render() {
        let formDiv = <LoginForm
            onEmailChange={this.onEmailChange}
            errors = {this.props.errors}
            onPasswordChange={this.onPasswordChange}
            authenticateHandler={this.onLoginBtnHandler}
        />
        if (this.props.loading) {
            formDiv = <Spinner />
        }
        let errorMsg = null;
        if (this.props.error) {
            errorMsg = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
             <Fragment>
                 {authRedirect}
                 {errorMsg}
                 {formDiv}
             </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password) => dispatch(actions.authUser(email, password)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateComponent);