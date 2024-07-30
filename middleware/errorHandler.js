function errorHandler(err, req, res, next) {
    res.status(err.status || 500).send({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  }
  
  module.exports = errorHandler;
  