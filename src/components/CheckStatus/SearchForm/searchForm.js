import React, { Component } from 'react';
import classes from './searchForm.module.css';
import CarFinderIcon from '../../UI/CarFinderSvg/carFinder';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { FormControl, InputAdornment, Input, InputLabel, Button } from '@material-ui/core';
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    overrides: {
        MuiInput: {
            root: {
                fontSize: 25,
                padding: '10px 12px',
                border: '20px solid #5E26EA',
                color: '#E7E3F1',
            },
        },
        MuiInputLabel: {
            root: {
                color: 'white',
                fontSize: 20
            }
        },
        MuiFormLabel: {
            root: {
                color: 'white',
                fontSize: 15,
                "&$focused": {
                    color: 'white'
                }
            }
        },
        MuiInputAdornment: {
            root: {
                marginLeft: '25%',
            },
        },
        MuiButton: {
            root: {
                backgroundColor: '#1616A7',
                color: 'white',
                marginTop: '20px',
                // boxSizing: 'border-box',
                border: 'none',
                "&:hover": {
                    backgroundColor: '#424278'
                }
            },
            text: {
                padding: '12px 18px',
                fontSize: 20
            },
        },
    }
});
class SearchForm extends Component {
    state = {
        inputValue: ''
    }
    onInputChangeHandler = (event) => {
        this.setState({ inputValue: event.target.value });
    }
    onBtnClick = () => {
        this.props.onBtnClick(this.state.inputValue);
    }
    render() {
        return (
            <div className={classes.heading}>
                <h1 style={{ padding: '70px 50px' }}>Check Your Parking Status here</h1>
                <FormControl className={classes.statusForm} style={{ paddingBottom: '80px' }}>
                    <ThemeProvider theme={theme}>
                        <InputLabel htmlFor="input-with-icon-adornment">Enter Car Number</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            value={this.state.inputValue}
                            onChange={this.onInputChangeHandler}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CarFinderIcon />
                                </InputAdornment>
                            }
                        />
                        <Button
                            onClick={this.onBtnClick}
                        >
                            Search
                    </Button>
                    </ThemeProvider>
                </FormControl>
            </div>
        );
    }
}
export default SearchForm;