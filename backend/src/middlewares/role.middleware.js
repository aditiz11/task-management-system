export const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    console.log(`[ROLE][FORBIDDEN] User ID ${req.user.id} attempted admin-only access`);
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
