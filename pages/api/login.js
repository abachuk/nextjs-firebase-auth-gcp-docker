export default (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const token = req.body.token;
  req.firebaseServer
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.session.decodedToken = decodedToken;
      return decodedToken;
    })
    .then((decodedToken) => res.json({ status: true, decodedToken }))
    .catch((error) => res.json({ error }));
  req.session = null;
  res.status(200).json({ status: true });
};
