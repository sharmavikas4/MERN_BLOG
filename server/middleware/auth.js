const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ message: "Unauthorized" });
};

//Check if user is an admin
const isAdmin = (req, res, next) => {
  if(req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: "Forbidden: Admins only" });
};

//Check if user is an editor
const isEditor = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'editor' || req.user.role === 'admin')) {
    return next();
  }
  res.status(403).json({ message: "Forbidden: Editors only" });
};

export { isAuthenticated, isAdmin, isEditor };
