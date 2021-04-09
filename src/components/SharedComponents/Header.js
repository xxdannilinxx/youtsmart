import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import VideoCall from '@material-ui/icons/VideoCall';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const showBack = (location.pathname !== '/' ? true : false);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {showBack ? <ArrowBackIos className={classes.icon} onClick={() => history.go(-1)} /> : <VideoCall className={classes.icon} />}
                    <Typography variant="h6" color="inherit" noWrap>
                        YoutSmart
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}