import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertFromRaw } from "draft-js";
import withDashboard from "../../hoc/dashboard";
import { firestore } from "../../utils/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const PostDetails = (props) => {
  const classes = useStyles();
  const { post } = props;
  const content = props.post.body;
  const html = stateToHTML(convertFromRaw(JSON.parse(content)));
  return (
    <div>
      <h2>{post.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
};

PostDetails.getInitialProps = async (ctx) => {
  const postRef = firestore.collection("posts").doc(ctx.query.pid);
  const postRefDoc = await postRef.get();
  const post = {
    id: postRefDoc.id,
    ...postRefDoc.data(),
    body: postRefDoc.data().body,
  };
  return {
    post,
  };
};

export default withDashboard(PostDetails);
