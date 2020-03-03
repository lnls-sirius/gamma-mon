import React from 'react';

import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleConfig: null,
            open: false,
            hihiError: false,
            highError: false,
            hihiVal: props.hihi,
            highVal: props.high
        };

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAlarmState = (highVal, hihiVal) => {
        this.setState((state, props) => {
            if (highVal == null) { highVal = state.highVal; }
            if (hihiVal == null) { hihiVal = state.hihiVal; }
            const err = (parseFloat(highVal) >= parseFloat(hihiVal));
            return {
                hihiVal: hihiVal,
                highVal: highVal,
                hihiError: isNaN(hihiVal) || hihiVal === '' || err,
                highError: isNaN(highVal) || highVal === '' || err,
            }
        });
    };

    render() {
        return (
            <div>
                <Button startIcon={<SettingsRoundedIcon/>} size='small' style={{ margin: '2px' }} variant="contained" color="primary" onClick={this.handleClickOpen}> Settings
            </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
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
                                onChange={(evt) => this.handleAlarmState(null, evt.target.value)}
                            />
                            <TextField
                                style={{ padding: '5px' }}
                                error={this.state.highError}
                                label="Minor alarm (HIGH)"
                                defaultValue={this.props.high}
                                value={this.state.highVal}
                                onChange={(evt) => this.handleAlarmState(evt.target.value, null)}
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
