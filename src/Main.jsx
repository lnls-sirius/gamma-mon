import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CCG_URL } from './utils/consts';

const useStyles = makeStyles(theme => ({
    grid: {
        direction: 'column',
        justify: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(4)
    },
    component: {
        margin: theme.spacing(1)
    }
}));

export default props => {
    const classes = useStyles();
    return <div>
        <Grid className={classes.grid}>
            <Typography
                className={classes.component}
                style={{ 'font-size': '18pt' }}>VACS - WEB OPIs</Typography>
            <Button
                className={classes.component}
                component={Link}
                to={CCG_URL}
                color="primary"
                variant='contained'>Cold Cathode Gauge</Button>
        </Grid>
    </div>;
}
