import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Footer(props) {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Youtsmart
        </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Sua melhor experiência em aplicativo!
        </Typography>
        </footer>
    );
}