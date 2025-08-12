const userMiddleware = {
  body: (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }
    next();
  },
};

module.exports = userMiddleware;