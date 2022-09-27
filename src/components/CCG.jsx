import React from 'react';

import PressureBar from './PressureBar';
import { Grid, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import li from '../static/LI-CCG.json';
import bo from '../static/BO-CCG.json';
import si from '../static/SI-CCG.json';
import fe from '../static/FE-CCG.json';
import tb from '../static/TB-CCG.json';
import ts from '../static/TS-CCG.json';

import { SI, BO, BASE_URL } from '../utils/consts';

const STATE = {
    INITIAL: 0, BO: 1, SI: 2, TB: 3, TS: 4, ALL: 5, TB_TS: 6,
    BO_TB_TS: 7, FE: 8, SI_FE: 9, BO_TB_TS_FE: 10, LI: 11
}

const gridItem = {
    margin: "8px",
    border: "1px solid red"
};

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
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.LI })}>LI</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.TB })}>TB</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.BO })}>BO</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.TS })}>TS</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.SI })}>SI</Button><br />
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
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.BO_TB_TS })}>TB, BO & TS</Button><br />
                    </Grid>
                    <Grid item style={{ 'margin': '4px' }}>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.BO_TB_TS_FE })}>TB, BO, TS & FE</Button><br />
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
            case STATE.LI:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={li} title='LI - Pressure' rows={1} />
            case STATE.BO:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' rows={1} {...BO} />
            case STATE.TB:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' rows={1} {...BO} />
            case STATE.TS:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' rows={1} {...BO} />
            case STATE.SI:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure' rows={1} {...SI} />
            case STATE.FE:
                return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure' rows={1} {...SI} />


            case STATE.TB_TS:
                return <Grid container justify='center' flexGrow={1}>
                    <Grid item md={5} lg={5}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' rows={1} {...BO} />
                    </Grid>
                    <Grid item md={7} lg={7}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' rows={1} {...BO} />
                    </Grid>
                </Grid>
            case STATE.BO_TB_TS:
                return <Grid container justify='center' flexGrow={1}>
                    <Grid item md={2} lg={2}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' rows={1} {...BO} />
                    </Grid>
                    <Grid item md={7} lg={7}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' rows={1} {...BO} />
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' rows={1} {...BO} />
                    </Grid>
                </Grid>
            case STATE.BO_TB_TS_FE:
                return <Grid container justify='center' flexGrow={1}>
                    <Grid item md={2} lg={2}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' rows={2} {...BO} />
                    </Grid>
                    <Grid item md={7} lg={7}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' rows={2} {...BO} />
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' rows={2} {...BO} />
                    </Grid>
                    <Grid item md={12} lg={12}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure' rows={2} {...SI} />
                    </Grid>
                </Grid>
            case STATE.SI_FE:
                return <Grid container justify='center' flexGrow={1}>
                    <Grid item md={12} lg={12}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure' rows={2} {...SI} />
                    </Grid>
                    <Grid item md={12} lg={12}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure' rows={2} {...SI} />
                    </Grid>
                </Grid>


            case STATE.ALL:
                return <Grid container justify='center'>
                    <Grid item md={10} lg={10}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure'  rows={2} />
                    </Grid>
                    <Grid item md={2} lg={2}>
                        <Grid container justify='center'>
                            <Grid item md={5} lg={5}>
                                <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure'  rows={2} />                            
                            </Grid>
                            <Grid item md={7} lg={7}>
                                <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure'  rows={2} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={8} lg={8}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={fe} title='FE - Pressure'  rows={2} />
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure'  rows={2} />
                    </Grid>
                </Grid>
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