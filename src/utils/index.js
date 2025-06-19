import { ApiError } from "./api-error.js";

export const validate = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return next(new ApiError(400, "Validation failed", result.error.format()));
  }

  req.validateBody = result.data;
  next();
};
