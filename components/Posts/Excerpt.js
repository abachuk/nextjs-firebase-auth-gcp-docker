import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function PostExcerpt({ post }) {
  const classes = useStyles();
  return (
    <Link href={`/posts/[pid]`} as={`/posts/${post.id}`}>
      <a className={classes.link}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={post.title} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={post.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </a>
    </Link>
  );
}
