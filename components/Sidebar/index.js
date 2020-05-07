import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemLink from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CommentIcon from "@material-ui/icons/Comment";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import CategoryIcon from "@material-ui/icons/Category";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "../../utils/activeLink";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "15px",
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    paddingTop: "15px",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    paddingTop: "15px",
  },
  active: {
    background: "#ddd",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { container } = props;
  return (
    <nav aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileSidebarOpen}
          onClose={props.handleDrawerMobileClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <nav>
            <List>
              <Link href="/posts" activeClassName={classes.active}>
                <ListItemLink button key="Posts">
                  <ListItemIcon>
                    <CommentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </ListItemLink>
              </Link>
              <Link href="/teams" activeClassName={classes.active}>
                <ListItemLink button key="Teams">
                  <ListItemIcon>
                    <GroupWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItemLink>
              </Link>
              <Link href="/people" activeClassName={classes.active}>
                <ListItemLink button key="People">
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemLink>
              </Link>
              <Link href="/projects" activeClassName={classes.active}>
                <ListItemLink button key="Projects">
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Projects" />
                </ListItemLink>
              </Link>
            </List>
            <Divider />
          </nav>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.isOpen,
            [classes.drawerClose]: !props.isOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: props.isOpen,
              [classes.drawerClose]: !props.isOpen,
            }),
          }}
          open={props.isOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={props.handleSidebarToggle}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <nav>
            <List>
              <Link href="/posts" activeClassName={classes.active}>
                <ListItemLink button key="Posts">
                  <ListItemIcon>
                    <CommentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </ListItemLink>
              </Link>
              <Link href="/teams" activeClassName={classes.active}>
                <ListItemLink button key="Teams">
                  <ListItemIcon>
                    <GroupWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItemLink>
              </Link>
              <Link href="/people" activeClassName={classes.active}>
                <ListItemLink button key="People">
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemLink>
              </Link>
              <Link href="/projects" activeClassName={classes.active}>
                <ListItemLink button key="Projects">
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Projects" />
                </ListItemLink>
              </Link>
            </List>
            <Divider />
          </nav>
        </Drawer>
      </Hidden>
    </nav>
  );
}
