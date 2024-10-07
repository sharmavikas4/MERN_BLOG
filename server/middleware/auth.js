const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ message: false });
};

export default isAuthenticated;
