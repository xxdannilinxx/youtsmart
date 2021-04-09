import React from 'react'

import HeaderComponent from '../components/SharedComponents/Header';
import SearchComponent from '../components/SharedComponents/Search';
import FooterComponent from '../components/SharedComponents/Footer';
import ListVideosComponent from '../components/Videos/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { configs } from '../config/youtube';

import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    categories: {
        padding: theme.spacing(5, 5, 5, 5),
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [videosMusica, setVideosMusica] = React.useState([]);
    const [videosEducacao, setVideosEducacao] = React.useState([]);
    const [videosDocumentario, setVideosDocumentario] = React.useState([]);
    const [videosFavoritos] = React.useState(localStorage.getItem('favoritos') || []);

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
            <SearchComponent />
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
            <FooterComponent />
        </React.Fragment >
    );
};