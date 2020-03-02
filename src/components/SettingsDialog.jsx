import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';


class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleConfig: null,
            open: false,
            hihiError: false,
            highError: false,
            hihiVal: null,
            highVal: null
        };

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}> Settings
            </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent component={'span'}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >

                            <TextField
                                style={{ padding: '5px' }}
                                error={this.state.hihiError}
                                label="Major alarm (HIHI)"
                                defaultValue={this.props.hihi}
                                value={this.state.hihiVal}
                                onChange={
                                    (evt) => {
                                        const val = evt.target.value;
                                        this.setState({
                                            hihiVal: val,
                                            hihiError: isNaN(val) || val === ''
                                        });
                                    }}
                            />
                            <TextField
                                style={{ padding: '5px' }}
                                error={this.state.highError}
                                label="Minor alarm (HIGH)"
                                defaultValue={this.props.high}
                                value={this.state.highVal}
                                onChange={
                                    (evt) => {
                                        const val = evt.target.value;
                                        this.setState({
                                            highVal: val,
                                            highError: isNaN(val) || val === ''
                                        });
                                    }}
                            />

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                if (!this.state.highError && !this.state.hihiError) {
                                    this.props.handleConfig(
                                        this.state.hihiVal ? this.state.hihiVal : this.props.hihi,
                                        this.state.highVal ? this.state.highVal : this.props.high);
                                    this.handleClose();
                                }
                            }}
                            variant="contained" color="primary">OK</Button>
                        <Button onClick={() => { this.handleClose() }} variant="contained" color="secondary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default SettingsDialog;