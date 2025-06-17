export class ApiResponse {
  constructor({
    statusCode = 200,
    data = null,
    message = "Success",
    success = statusCode < 400,
    meta = null,
  }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
    if (meta) this.meta = meta;
  }
}
