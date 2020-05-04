import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const config = {
  apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
  authDomain: publicRuntimeConfig.FIREBASE_AUTH_DOMAIN,
  databaseURL: publicRuntimeConfig.FIREBASE_DATABASE_URL,
  projectId: publicRuntimeConfig.FIREBASE_PROJECT_ID,
  appId: publicRuntimeConfig.FIREBASE_APP_ID,
};

console.log(config);

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const firebaseInstance = firebase.app();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export default firestore;
