class ErrorMiddleware {
  static handler(err, res) {
    if (err instanceof ApiError) {
      res.status(err.status);
      res.send(err);
    } else {
      res.sendStatus(500); // other unhandled error
    }
  }
}

class ApiError extends Error {
  constructor(status, type, data = null) {
    super(type);
    this.status = status;
    this.type = type;
    this.data = data;
  }
}

module.exports = { ErrorMiddleware, ApiError };
