import React from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    Link,
    useParams
} from "react-router-dom";
import ReactPlayer from "react-player";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import HeaderComponent from '../components/SharedComponents/Header';
import FooterComponent from '../components/SharedComponents/Footer';

import { configs } from '../config/youtube';
import parseVideo from '../utils/parseVideo';

const useStyles = makeStyles((theme) => ({
    video: {
        padding: theme.spacing(5, 5, 5, 5),
    }
}));

export default function Watch(props) {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const url = `https://www.youtube.com/watch?v=${id}`;
    const [videosFavoritos, setVideosFavoritos] = React.useState(JSON.parse(localStorage.getItem('favoritos')) || []);
    const [videosAssistidosRecentemente, setVideosAssistidosRecentemente] = React.useState(JSON.parse(localStorage.getItem('assistidos')) || []);
    const [favorito, setFavorito] = React.useState(false);
    const [video, setVideo] = React.useState({});

    function updateFavorites() {
        let fvt = videosFavoritos;
        if (favorito) {
            fvt = fvt.filter(item => {
                return item.id !== id;
            });
        } else {
            fvt.unshift((video ? video : { "id": id }));
        }
        setFavorito(!favorito);
        setVideosFavoritos(fvt);
        localStorage.setItem('favoritos', JSON.stringify(videosFavoritos));
    }

    React.useEffect(() => {
        let checar = videosFavoritos.filter(item => {
            return item.id === id;
        });
        if (checar.length) {
            setFavorito(true);
        }
        /**
         * 
         */
        function getYoutubeInfos() {
            /**
             * 
             */
            function updateVideosAssistidos(newVideo) {
                let vidarec = videosAssistidosRecentemente;
                vidarec = vidarec.slice(0, 2);
                vidarec.unshift(newVideo);
                setVideosAssistidosRecentemente(vidarec);
                localStorage.setItem('assistidos', JSON.stringify(vidarec));
            }
            /**
             * 
             */
            axios.get(`${configs.url.getInfo}${id}`)
                .then(res => {
                    let videoInfo = {};
                    res.data.items.forEach(item => {
                        videoInfo = parseVideo(item);
                    });
                    setVideo(videoInfo);
                    updateVideosAssistidos(video);
                })
                .catch(error => {
                    history.push('/404');
                });
        }
        getYoutubeInfos();

    }, [id, video, history, videosFavoritos, videosAssistidosRecentemente]);

    return (
        <React.Fragment>
            <HeaderComponent />
            <Grid container component="main">
                assistir vídeo, colocar em vídeos assistidos recentemente e opção de favoritar, se já não estiver nos favoritos (remover)
                <Grid container justify="center">
                    <ReactPlayer
                        width={860}
                        height={480}
                        className={classes.video}
                        url={url}
                    />
                </Grid>
                <Grid container justify="center">
                    <Typography>
                        <Button variant="outlined" color="primary" position="inline" onClick={updateFavorites}>
                            {favorito ? 'REMOVER' : 'ADICIONAR'} DOS FAVORITOS
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <FooterComponent />
        </React.Fragment>
    );
};