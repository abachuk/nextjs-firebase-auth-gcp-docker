import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header({ handleSidebarToggle, sidebarOpen }) {
  const classes = useStyles();
  //   const [sidebarOpen, setSidebarOpen] = useState(true);

  //   function handleDrawerOpen() {
  //     setSidebarOpen(true);
  //   }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: sidebarOpen,
      })}
    >
      <Toolbar>
        <Hidden smUp implementation="css">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-label="open drawer"
            onClick={handleSidebarToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown implementation="css">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-label="open drawer"
            onClick={handleSidebarToggle}
            className={clsx(classes.menuButton, {
              [classes.hide]: sidebarOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          LOGO
        </Typography>
        {/* <Button color="inherit">
          <UserMenu user={this.props.session} />
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}
