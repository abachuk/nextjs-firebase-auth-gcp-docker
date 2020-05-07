import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { auth } from "../utils/firebase";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
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
          this.setState({ user: auth, uid: auth.uid });
        }
      });
    }

    handleSidebarToggle = () => {
      this.setState((prevState) => ({
        sidebarOpen: !prevState.sidebarOpen,
      }));
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Header
              handleSidebarToggle={this.handleSidebarToggle}
              sidebarOpen={this.state.sidebarOpen}
            />
            <Sidebar
              isOpen={this.state.sidebarOpen}
              mobileSidebarOpen={this.state.mobileSidebarOpen}
              handleSidebarToggle={this.handleSidebarToggle}
              handleDrawerClose={this.handleDrawerClose}
              handleDrawerMobileClose={this.handleDrawerMobileClose}
            />
            <Page {...this.props} />
          </main>
        </div>
      );
    }
  }

  return withStyles(styles)(Dashboard);
};

export default withDashboard;
