/**
 * Apply `iterator` to the first `limit` items in `array`
 * and call `callback` when done
 *
 * @param {Array} array array
 * @param {Number} limit limit
 * @param {Function} iterator iterator
 * @param {Function} callback callback
 * @api public
 */

module.exports = function (array, limit, iterator, callback) {
  var completed = 0;
  var started = 0;
  var running = 0;
  var len = array.length;

  function complete (err) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    completed += 1;
    running -= 1;
    if (completed === len) {
      callback();
      return;
    }
  }

  while (running < limit && started < len) {
    iterator(array[started], complete);
    started += 1;
    running += 1;
  }
};
