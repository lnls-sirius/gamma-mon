import React from 'react';

import PressureBar from './PressureBar';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import bo from '../static/BO-CCG.json';
import si from '../static/SI-CCG.json';
import fe from '../static/FE-CCG.json';
import tb from '../static/TB-CCG.json';
import ts from '../static/TS-CCG.json';

import { SI, BO, BASE_URL } from '../utils/consts';

const STATE = {
    INITIAL: 0, BO: 1, SI: 2, TB: 3, TS: 4, ALL: 5, TB_TS: 6,
    BO_TB_TS: 7, FE: 8, SI_FE: 9, BO_TB_TS_FE: 10
}

class CCG extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: STATE.INITIAL, tooltipVisible: false, tooltipX: '', tooltipY: '' };
    }

    customTooltipCallback = (tooltipModel) => {

        if (tooltipModel.opacity === 0) {
            this.setState({ tooltipVisible: false, tooltipX: '', tooltipY: '' });
            return;
        }

        // set values
        const x = tooltipModel.dataPoints[0].xLabel;
        const y = tooltipModel.dataPoints[0].yLabel;

        this.setState({ tooltipVisible: true, tooltipX: x, tooltipY: y });
    }

    renderNav = () => {
        if (this.state.content !== STATE.INITIAL) {
            return <div className='Menu'>
                <Button variant="contained" color="default" onClick={() => this.setState({ content: STATE.INITIAL })}>Back</Button>
            </div>
        } else {
            return <div className='Menu'>
                <div className='MainTitle'>Sirius - Pressure Readings</div>
                <div style={{ 'margin-bottom': '15px' }} className='SubTitle'>Cold Cathode Gauge</div>
                <Grid container justify='center' flexGrow={1}>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.BO })}>BO</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.SI })}>SI</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.TB })}>TB</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.TS })}>TS</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.FE })}>FE</Button><br />
                    </Grid>
                </Grid>
                <Grid container justify='center' flexGrow={1}>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.TB_TS })}>TB & TS</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.BO_TB_TS })}>BO, TB & TS</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.BO_TB_TS_FE })}>BO, TB, TS & FE</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.SI_FE })}>SI & FE</Button><br />
                    </Grid>
                </Grid>
                <Grid container justify='center' flexGrow={1}>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.ALL })}>ALL</Button><br />
                    </Grid>
                </Grid>
                <Grid container justify='center' flexGrow={1}>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button
                            component={Link}
                            to={BASE_URL}
                            color="secondary"
                            variant='contained'>Back</Button>
                    </Grid>
                </Grid>

            </div >
        }
    }

    renderCustomTooltip = () => {
        return <table align='center'>
            <tbody>
                {this.state.tooltipVisible ? (
                    <tr>
                        <td>{this.state.tooltipX}</td>
                        <td>{this.state.tooltipY}</td>
                    </tr>
                ) : (<tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>)}
            </tbody>
        </table>
    }

    backHandler = () => this.setState({ content: STATE.INITIAL })

    renderGraph = () => {
        switch (this.state.content) {
            case STATE.BO:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' {...BO} />
            case STATE.TB:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure'  {...BO} />
            case STATE.TS:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure'  {...BO} />
            case STATE.SI:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure'  {...SI} />
            case STATE.FE:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure'  {...SI} />


            case STATE.TB_TS:
                return <div style={{ 'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap' }}>
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure'  {...BO} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure'  {...BO} />
                </div>
            case STATE.BO_TB_TS:
                return <div style={{ 'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap' }}>
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' {...BO} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure'  {...BO} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure'  {...BO} />
                </div>
            case STATE.BO_TB_TS_FE:
                return <div style={{ 'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap' }}>
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure'  {...BO} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure'  {...BO} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure'  {...BO} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure'  {...SI} />
                </div>

            case STATE.SI_FE:
                return <div>
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure' {...SI} />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure' {...SI} />
                </div>


            case STATE.ALL:
                return <div style={{ 'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap' }}>
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure' />
                    <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure' />
                </div>

            default:
                if (this.state.tooltipVisible) { this.setState({ tooltipVisible: false }); }
                return <div></div>
        }
    }

    render() {
        return <div>
            {this.renderGraph()}
            {this.renderCustomTooltip()}
            {this.renderNav()}
        </div>
    }
}
export default CCG;