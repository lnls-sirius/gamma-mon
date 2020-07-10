import React from 'react';

import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleConfig: null,
            open: false,
            hihiError: false,
            highError: false,
            hihiVal: props.hihi.toExponential(1),
            highVal: props.high.toExponential(1),
            topLimErr: false,
            botLimErr: false,
            topLim: props.topLim.toExponential(1),
            botLim: props.botLim.toExponential(1),
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

    handleLimit = (top, bot) => {
        this.setState((state, props) => {
            if (top == null) { top = state.topLim; }
            if (bot == null) { bot = state.botLim; }
            const err = (parseFloat(bot) >= parseFloat(top));
            return {
                botLim: bot,
                topLim: top,
                botLimErr: isNaN(bot) || bot === '' || err,
                topLimErr: isNaN(top) || top === '' || err,
            }
        });
    }

    render() {
        return (
            <div>
                <Button startIcon={<SettingsRoundedIcon />} size='small' style={{ margin: '2px' }} variant="contained" color="primary" onClick={this.handleClickOpen}> Settings
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

                            <TextField
                                style={{ padding: '5px' }}
                                error={this.state.topLimErr}
                                label="Top Limit"
                                defaultValue={this.props.topLim}
                                value={this.state.topLim}
                                onChange={(evt) => this.handleLimit(evt.target.value, null)}
                            />

                            <TextField
                                style={{ padding: '5px' }}
                                error={this.state.botLimErr}
                                label="Bot Limit"
                                defaultValue={this.props.botLim}
                                value={this.state.botLim}
                                onChange={(evt) => this.handleLimit(null, evt.target.value)}
                            />

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                if (!this.state.highError && !this.state.hihiError) {
                                    this.props.handleConfig(
                                        this.state.hihiVal ? this.state.hihiVal : this.props.hihi,
                                        this.state.highVal ? this.state.highVal : this.props.high,
                                    );
                                }
                                if (!this.state.topLimErr && !this.state.botLimErr) {
                                    this.props.handleConfigLimits(
                                        this.state.topLim ? this.state.topLim : this.props.topLim,
                                        this.state.botLim ? this.state.botLim : this.props.botLim,
                                    );
                                }
                                this.handleClose();
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
