import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    favorites: {
        padding: theme.spacing(1, 0, 0, 25),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

export default function Search() {
    const classes = useStyles();
    const history = useHistory();

    const [searchs] = React.useState(JSON.parse(localStorage.getItem('searchs')) || []);
    const defaultProps = {
        options: searchs,
    };

    function addSearch(search) {
        if (search) {
            if (searchs.indexOf(search) === -1) {
                searchs.push(search);
                localStorage.setItem('searchs', JSON.stringify(searchs.slice(0, 10)));
            }
            /**
             * 
             */
            history.push(`/search/${search}`);
        }
    }

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid>
                                <Autocomplete
                                    {...defaultProps}
                                    id="disable-close-on-select"
                                    freeSolo
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            addSearch(e.target.value);
                                        }
                                    }}
                                    onChange={option => addSearch(option.target.value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Faça sua pesquisa" margin="normal" />
                                    )}
                                />
                            </Grid>
                            <div className={classes.favorites}>
                                <Link to="/favorites" replace>
                                    <Button variant="outlined" color="primary" position="inline">
                                        MEUS FAVORITOS
                            </Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </main>
        </React.Fragment >
    );
}