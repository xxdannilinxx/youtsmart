import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

export default function List(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(props.loading);
    const [videos, setVideos] = React.useState(props.videos);

    React.useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

    React.useEffect(() => {
        setVideos(props.videos);
    }, [props.videos]);

    return (
        <React.Fragment>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {videos.map(video => (
                            <Grid item key={video} xs={12} sm={6} md={4}>
                                { loading ?
                                    <div>
                                        <Skeleton height={260} width={260} />
                                        <Skeleton height={260} width={260} />
                                        <Skeleton height={260} width={260} />
                                    </div>
                                    :
                                    <Card className={classes.card}>
                                        <Link to={location => ({ ...location, pathname: `/watch/${video.id}` })} replace >
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={video.image}
                                                title={video.title}
                                            />
                                        </Link>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                {video.title}
                                            </Typography>
                                            <Typography>
                                                {video.channel}
                                            </Typography>
                                            <Typography>
                                                Publicado em {video.date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment >
    );
}