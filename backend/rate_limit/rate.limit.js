import rateLimit from "express-rate-limit";

export const postLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  // This helper handles the IPv6 formatting that the library is complaining about
  keyGenerator: (req) => {
    return req.auth?.userId || req.ip;
  },
  // Explicitly tell the library to skip the IP fallback check
  validate: { 
    default: false,
    keyGenerator: false 
  }, 
  message: { error: "Too many comments/posts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});