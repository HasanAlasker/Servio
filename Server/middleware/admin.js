const admin = (req, res, next) => {
  // Check if user exists (from auth middleware)
  if (!req.user) {
    return res.status(401).send("Unauthorized. Please login.");
  }

  // Check if user is admin
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admin only.");
  }

  next();
};

export default admin;