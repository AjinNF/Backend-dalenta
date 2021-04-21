module.exports.error = (err, req, res, next) => {
    return res.status(err.status || 500).json({
      metadata: {
        message: err.message || 'Something went wrong',
        code: res.statusCode,
      },
    })
  }