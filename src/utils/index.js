import { ApiError } from "./api-error.js";

export const validate = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log("Validation result:", req.body, result);
  if (!result.success) {
    return next(new ApiError(400, "Validation failed", result.error.format()));
  }

  req.validateBody = result.data;
  next();
};
export function getFutureDate(durationStr = "1d") {
  const duration = parseInt(durationStr);
  const unit = durationStr.replace(duration, "");
  const now = new Date();
  switch (unit) {
    case "d":
      now.setDate(now.getDate() + duration);
      break;
    case "h":
      now.setHours(now.getHours() + duration);
      break;
    case "m":
      now.setMinutes(now.getMinutes() + duration);
      break;
    case "s":
      now.setSeconds(now.getSeconds() + duration);
      break;
    default:
      throw new Error("Unsupported time unit. Use 'd', 'h', 'm', or 's'.");
  }

  return now;
}
