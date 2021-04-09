import React from 'react'
import axios from 'axios';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import HeaderComponent from '../components/SharedComponents/Header';
import FooterComponent from '../components/SharedComponents/Footer';
import ListVideosComponent from '../components/Videos/List';

import { configs } from '../config/youtube';

const useStyles = makeStyles((theme) => ({
    categories: {
        padding: theme.spacing(5, 5, 0, 5),
    },
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

export default function Home(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState('');
    const [videosMusica, setVideosMusica] = React.useState([]);
    const [videosEducacao, setVideosEducacao] = React.useState([]);
    const [videosDocumentario, setVideosDocumentario] = React.useState([]);
    const [videosPesquisa, setVideosPesquisa] = React.useState([]);
    const [videosFavoritos] = React.useState(localStorage.getItem('favoritos') || []);
    const [videosAssistidosRecentemente] = React.useState(localStorage.getItem('assistidos') || []);
    const [searchs, setSearchs] = React.useState(JSON.parse(localStorage.getItem('searchs')) || []);

    function searchingYoutube(search) {
        /**
         * 
         */
        const sendSearch = async (search) => {
            setLoading(true);
            axios.get(`${configs.url.search}${search}`)
                .then(res => {
                    let items = [];
                    res.data.items.forEach(item => {
                        items.push({
                            id: item.id.videoId,
                            title: item.snippet.title,
                            channel: item.snippet.channelTitle,
                            date: moment(item.snippet.publishedAt).format('DD/MM/YYYY') + ' às ' + moment(item.snippet.publishedAt).format('HH:mm'),
                            image: item.snippet.thumbnails.high.url,
                        });
                    });
                    setVideosPesquisa(items);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
        /**
         * 
         */
        if (search) {
            if (searchs.indexOf(search) === -1) {
                let schs = searchs;
                schs = schs.slice(0, 4);
                schs.unshift(search);
                setSearchs(schs);
                localStorage.setItem('searchs', JSON.stringify(searchs));
            }
        }
        /**
         * 
         */
        setSearch(search);
        if (search) {
            sendSearch(search);
        }
    }

    React.useEffect(() => {
        const getVideos = async (categoryId) => {
            axios.get(`${configs.url.videoCategory}${categoryId}`)
                .then(res => {
                    let items = [];
                    res.data.items.forEach(item => {
                        items.push({
                            id: item.id.videoId,
                            title: item.snippet.title,
                            channel: item.snippet.channelTitle,
                            date: moment(item.snippet.publishedAt).format('DD/MM/YYYY') + ' às ' + moment(item.snippet.publishedAt).format('HH:mm'),
                            image: item.snippet.thumbnails.high.url,
                        });
                    });
                    switch (categoryId) {
                        default:
                        case 10:
                            setVideosMusica(items);
                            break;
                        case 27:
                            setVideosEducacao(items);
                            break;
                        case 35:
                            setVideosDocumentario(items);
                            break;
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
        getVideos();
    }, []);

    return (
        <React.Fragment>
            <HeaderComponent />
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <div className={classes.heroButtons}>
                        <Grid>
                            <Autocomplete
                                options={searchs}
                                freeSolo
                                clearOnEscape
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        searchingYoutube(event.target.value);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Faça sua pesquisa" value="x" margin="normal" />
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
            {search ?
                <main>
                    <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                        Resultados de "{search}":
                    </Typography>

                    <ListVideosComponent videos={videosPesquisa} loading={loading} />
                </main>
                :
                <main>
                    <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                        Assistidos recentemente
                    </Typography>
                    <ListVideosComponent videos={videosAssistidosRecentemente} loading={loading} />
                    <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                        Música
                    </Typography>
                    <ListVideosComponent videos={videosMusica} loading={loading} />

                    <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                        Educação
                    </Typography>
                    <ListVideosComponent videos={videosEducacao} loading={loading} />

                    <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                        Documentário
                    </Typography>
                    <ListVideosComponent videos={videosDocumentario} loading={loading} />
                    <Typography className={classes.categories} gutterBottom variant="h5" component="h5">
                        Favoritos
                    </Typography>
                    <ListVideosComponent videos={videosFavoritos} loading={loading} />
                </main>
            }
            <FooterComponent />
        </React.Fragment >
    );
};