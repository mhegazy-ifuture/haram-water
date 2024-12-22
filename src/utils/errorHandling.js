export const asyncHandler = (fn) => (req, res, next) => {
  fn(req, res, next).catch(async (err) => {
    console.error(err);
    next(new Error(err, { cause: 500 }));
  });
};

export const globalResponseHandler = (err, req, res, next) => {
  if (err) {
    if (req.error) {
      return res.status(req.error.cause || 500).json({
        message: req.error.message || "Internal Server Error",
      });
    }

    return res.status(err.cause || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
