module.exports = (req, res) => {
  if (req.method === "POST") {
    req.session.decodedToken = null;
    res.json({ status: true });
  } else {
    res
      .status(400)
      .json({ error: "This endpoint supports POST requests only" });
  }
};
