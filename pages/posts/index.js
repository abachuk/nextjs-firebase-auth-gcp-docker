import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import withDashboard from "../../hoc/dashboard";
import { db } from "../../utils/firebase";
import PostExcerpt from "../../components/Posts/Excerpt";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Posts = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <PostExcerpt />
      <PostExcerpt />
      <PostExcerpt />
      <PostExcerpt />
    </List>
  );
};

export default withDashboard(Posts);
