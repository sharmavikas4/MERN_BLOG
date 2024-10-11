const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // Log the unauthorized access attempt
  console.warn(`Unauthorized access attempt: ${req.method} ${req.originalUrl}`);

  // Send a structured response with an appropriate status code
  return res.status(401).json({
    message: false,
    error: "User not authenticated",
  });
};

export default isAuthenticated;
