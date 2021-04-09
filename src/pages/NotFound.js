import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import HeaderComponent from '../components/SharedComponents/Header';
import FooterComponent from '../components/SharedComponents/Footer';

export default function NotFound(props) {

    return (
        <React.Fragment>
            <HeaderComponent />
            <Grid container component="main">
                <CssBaseline />
                <Grid item xs={12} align="center">
                    <div>
                        <Typography component="h1" mt={7} variant="h1">
                            404
                    </Typography>
                        <Typography>
                            Não encontramos o que você procura no momento, volte para o <Link to="/" push>início.</Link>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <FooterComponent />
        </React.Fragment>
    );
};