const { CustomAPIError } = require("../errors/customError");

module.exports = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: err.message }); // errorHandling.js
  const { CustomErrorApi } = require("../errors/customError");

  const errorHandling = (err, req, res, next) => {
    if (err instanceof CustomErrorApi) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    // If it's a validation error
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ message: "Validation Error", errors: errorMessages });
    }

    // For other errors
    res.status(500).json({ message: err.message });
  };

  module.exports = errorHandling;
};
