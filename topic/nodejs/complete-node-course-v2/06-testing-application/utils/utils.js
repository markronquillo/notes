module.exports.asyncAdd = (a, b, cb) => {
  setTimeout(() => {
    cb(a + b);
  }, 100);
};
