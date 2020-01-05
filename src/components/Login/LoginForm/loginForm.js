import React, { Component } from 'react'
import classes from './loginForm.module.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { TextField, FormControl, Grid, InputLabel, Input, IconButton, InputAdornment, Fab } from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff, Lock, LockOpen } from '@material-ui/icons';
const theme = createMuiTheme({
    overrides: {
        MuiInputAdornment: {
            root: {
                marginLeft: '25%',
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: 20,
                margin: '0 10px'
            }
        },
        MuiInput: {
            root: {
                underline: 'white'
            }
        },
        MuiFormLabel: {
            root: {
                fontSize: 15,
            }
        },
        MuiGrid: {
            container: {
                padding: '20px',
                display: 'block'
            }
        },
        MuiInputBase: {
            root: {
                width: '40vw',
                margin: '10px 10px'
            }
        },
        MuiFab: {
            root: {
                backgroundColor: 'black',
                color: 'white',
                fontSize: 20,
                "&:hover": {
                    color: 'black'
                },
                "&:active": {
                    outline: 'none'
                },
                "&:focus": {
                    outline: 'none'
                }
            },
            extended: {
                margin: '7vh 20vw',
            }
        },
        MuiSvgIcon: {
            root: {
                marginRight: '20px'
            }
        }
    }
});
class LoginForm extends Component {
    state = {
        showPassword: false
    }

    handleClickShowPassword = () => {
        this.setState(() => {
            return ({ showPassword: !this.state.showPassword })
        })
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <div className={classes.mainDiv}>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="input-with-icon-grid"
                                        label="Email ID"
                                        value={this.state.email}
                                        onChange={(event) => this.props.onEmailChange(event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Lock />
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.passwordField}>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={(event) => this.props.onPasswordChange(event)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {this.props.errors ? <p>Invalid Email/Password.. <br /> Please Try Again...!</p> : null}
                            <Fab variant="extended" onClick={() => this.props.authenticateHandler()}>
                                <LockOpen className={classes.extendedIcon} />
                                Login
                            </Fab>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}
export default LoginForm;