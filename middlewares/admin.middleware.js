/**
 * Middleware para verificar si el usuario tiene rol de administrador
 */
const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      message: "Authentication required" 
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: "Admin privileges required" 
    });
  }

  next();
};

module.exports = adminMiddleware;
