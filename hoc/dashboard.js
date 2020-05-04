import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Hidden from "@material-ui/core/Hidden";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { auth } from "../utils/firebase";

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    color: "#fff",
  },
  appBarShift: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  hide: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const withDashboard = (Page) => {
  class Dashboard extends Component {
    state = {
      uid: null,
      user: null,
      sidebarOpen: true,
      mobileSidebarOpen: false,
    };

    static getInitialProps = async ({ req, res }) => {
      const isServer = !!req;
      console.log(req.session.decodedToken);
      if (isServer) {
        if (
          !req.session ||
          !req.session.decodedToken ||
          !req.session.decodedToken.uid
        ) {
          if (res) {
            res.writeHead(302, {
              Location: "/login",
            });
            res.end();
          } else {
            Router.push("/login");
          }
        }
      }
      if (isServer) {
        return {
          session: req && req.session ? req.session.decodedToken : null,
        };
      } else {
        return {
          session: {
            picture: auth.currentUser.photoURL,
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          },
        };
      }
    };

    componentDidMount() {
      auth.onAuthStateChanged((auth) => {
        if (auth && auth.uid) {
          console.log("auth changed 116", auth);
          this.setState({ user: auth, uid: auth.uid });
        }
      });
    }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Page {...this.props} />
          </main>
        </div>
      );
    }
  }

  return withStyles(styles)(Dashboard);
};

export default withDashboard;
