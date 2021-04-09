import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import HeaderComponent from '../components/SharedComponents/Header';
import FooterComponent from '../components/SharedComponents/Footer';
import ListVideosComponent from '../components/Videos/List';

const useStyles = makeStyles((theme) => ({
    categories: {
        padding: theme.spacing(5, 5, 0, 5),
    }
}));

export default function Home(props) {
    const classes = useStyles();
    const [videosFavoritos] = React.useState(JSON.parse(localStorage.getItem('favoritos')) || []);

    return (
        <React.Fragment>
            <HeaderComponent />
            <main>
                <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                    Meus favoritos
                    </Typography>
                <ListVideosComponent videos={videosFavoritos} />
            </main>
            <FooterComponent />
        </React.Fragment >
    );
};