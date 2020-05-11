import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import withDashboard from "../../hoc/dashboard";
import { firestore } from "../../utils/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";
import { user } from "../../utils/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  editor: {
    minHeight: "100px",
  },
}));

const NewPost = (props) => {
  const classes = useStyles();
  const [post, setPost] = useState({
    title: "",
    body: null,
    user_id: user().uid,
  });

  function handleSavePost(event) {
    event.preventDefault();
    firestore
      .collection("posts")
      .add(post)
      .then(function (docRef) {
        setPost({
          ...post,
          title: "",
          body: null,
        });
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <Grid container spacing={3} item xs={6}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSavePost}
      >
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Post Title"
            fullWidth
            margin="normal"
            placeholder="Enter post title"
            required
            onChange={(event) =>
              setPost({ ...post, title: event.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.editor}>
          <MUIRichTextEditor
            label="Post content..."
            inlineToolbar={true}
            toolbar={false}
            onChange={(state) =>
              setPost({
                ...post,
                body: JSON.stringify(convertToRaw(state.getCurrentContent())),
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Save
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default withDashboard(NewPost);
