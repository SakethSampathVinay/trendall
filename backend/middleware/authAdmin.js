import jwt from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return response
        .status(403)
        .json({ success: false, message: "Forbidden: Admins only" });
    }

    request.user = decoded; // (optional) attach user info to request
    next();
  } catch (error) {
    return response
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
