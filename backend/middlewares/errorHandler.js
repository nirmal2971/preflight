module.exports = function errorHandler (err, req, res, next) {
  console.error(err); // server-side log
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
};
