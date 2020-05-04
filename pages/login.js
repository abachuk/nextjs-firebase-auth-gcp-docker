import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Router } from "next/router";
import { auth, provider } from "../utils/firebase";
import axios from "axios";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  text: {
    width: "80%",
    margin: "20px auto 40px",
  },
  body: {
    backgroundColor: "#08AEEA",
    backgroundImage: "linear-gradient(0deg, #08AEEA 0%, #2AF598 120%)",
    minHeight: "100%",
  },
});

class Login extends Component {
  static async getInitialProps({ req, res, query }) {
    const isServer = !!req;
    let session;
    if (isServer) {
      session = req.session ? req.session.decodedToken : null;
      if (session && session.uid) {
        if (res) {
          res.writeHead(302, {
            Location: "/",
          });
          res.end();
        } else {
          Router.push("/");
        }
      }
    }
    return { session };
  }

  state = {
    url: "",
  };

  componentDidMount() {
    //document.querySelector("body").classList.add(this.props.classes.body);
  }

  handleLogin = async () => {
    await auth.signInWithPopup(provider).then((user) => {
      console.log(user);
    });
    const firebaseToken = await auth.currentUser.getIdTokenResult();
    console.log(firebaseToken);
    axios
      .post("/api/login", {
        token: firebaseToken.token,
      })
      .then((resp) => {
        console.log(resp);
      });
  };

  render() {
    const { classes } = this.props;
    return <button onClick={this.handleLogin}>Signin</button>;
  }
}

export default withStyles(styles)(Login);
