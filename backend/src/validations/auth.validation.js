const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
