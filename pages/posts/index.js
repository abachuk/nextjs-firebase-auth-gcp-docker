import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import withDashboard from "../../hoc/dashboard";
import { firestore } from "../../utils/firebase";
import PostExcerpt from "../../components/Posts/Excerpt";
import { user } from "../../utils/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Posts = (props) => {
  const classes = useStyles();
  const user_id = user().uid;
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    firestore
      .collection("posts")
      .where("user_id", "==", user_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          setPosts([...posts, { id: doc.id, ...doc.data() }]);
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List className={classes.root}>
          {posts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
          ))}
        </List>
      )}
    </>
  );
};

Posts.getServerSideProps = async (ctx) => {
  console.log("SSR");
  return { ssr: true };
};

export default withDashboard(Posts);
