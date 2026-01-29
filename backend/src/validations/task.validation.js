const { z } = require("zod");

exports.taskSchema = z.object({
  title: z.string(),
});
