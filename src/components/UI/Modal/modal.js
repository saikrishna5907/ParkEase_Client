import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import classes from './modal.module.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
class ModalUI extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState(() => ({ open: true }))
    };

    handleClose = () => {
        this.setState(() => ({ open: false }))
    };

    render() {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.props.openModal}
                onClose={this.props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.openModal}>
                    <div className={classes.paper}>
                        {this.props.children}
                    </div>
                </Fade>
            </Modal>
        );
    }
}
export default ModalUI;