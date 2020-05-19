import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import HeroImage from "../images/hero.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    marginTop: "12px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

const Index = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              VGF
            </Typography>
            <Button color="inherit">
              <Link href="/login">
                <a className={classes.link}>Login to see demo</a>
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>
              Very Good Framework
            </Typography>
            <Typography variant="h5" gutterBottom>
              Next.js starter kit for any web. Using Firebase for database and
              authenticaiton.
              <br /> Deploy to GCP with Cloud Run and CI/CD with CLoud build.
            </Typography>
            <HeroImage />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
