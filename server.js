const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { FirestoreStore } = require("@google-cloud/connect-firestore");
const next = require("next");
const admin = require("firebase-admin");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.prepare().then(() => {
  const server = express();
  //server.use(bodyParser.json()); // this breaks all POST /api/ endpoints

  server.use(
    session({
      secret: "secretum",
      saveUninitialized: true,
      store: new FirestoreStore({
        dataset: firebaseAdmin.firestore(),
      }),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 }, // week
    })
  );

  server.use((req, res, next) => {
    req.firebaseServer = firebaseAdmin;
    next();
  });

  server.get("*", (req, res) => handle(req, res));
  server.post("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
