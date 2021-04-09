import React from 'react'

import HeaderComponent from '../components/SharedComponents/Header';
import SearchComponent from '../components/SharedComponents/Search';
import FooterComponent from '../components/SharedComponents/Footer';
import ListVideosComponent from '../components/Videos/List';
import Typography from '@material-ui/core/Typography';

import { configs } from '../config/youtube';

import axios from 'axios';
import moment from 'moment';

export default function Home(props) {
    const [loading, setLoading] = React.useState(true);
    const [videos, setVideos] = React.useState([]);

    React.useEffect(() => {
        const getVideos = async () => {
            axios.get(`${configs.url.videoCategory}10`)
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
                    setVideos(items);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                })
        }
        getVideos();
    }, []);

    return (
        <React.Fragment>
            <HeaderComponent />
            <SearchComponent />
            <Typography gutterBottom variant="h5" component="h5">
                Músicas
            </Typography>
            <ListVideosComponent videos={videos} loading={loading} />

            <Typography gutterBottom variant="h5" component="h5">
                Educação
            </Typography>
            <ListVideosComponent videos={videos} loading={loading} />

            <Typography gutterBottom variant="h5" component="h5">
                Documentários
            </Typography>
            <ListVideosComponent videos={videos} loading={loading} />

            <Typography gutterBottom variant="h5" component="h5">
                Favoritos
            </Typography>
            <ListVideosComponent videos={videos} loading={loading} />
            <FooterComponent />
        </React.Fragment >
    );
};