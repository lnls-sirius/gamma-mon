import React from 'react';
import { Route, BrowserRouter, Switch, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box } from '@material-ui/core';

import { BASE_URL, CCG_URL } from './utils/consts';
import Main from './Main';
import CCG from './components/CCG';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1
    },
}));

function NoMatch() {
    let location = useLocation();
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Alert style={{ marginTop: '16px', 'width': '75%' }} severity="error">
                <AlertTitle>Error</AlertTitle>
                    No match for <code>{location.pathname}</code>
            </Alert>
        </Box>
    );
}
export default props => (
    <BrowserRouter >
        <Switch>
            <Route path={CCG_URL} component={CCG} />
            <Route exact path={BASE_URL} component={Main} />
            <Route path="*"><NoMatch /></Route>
        </Switch>
    </BrowserRouter>
);