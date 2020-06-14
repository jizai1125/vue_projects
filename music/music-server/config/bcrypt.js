const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();

/**
 * 生成hash
 */
exports.generateHash = function (content) {
  return bcrypt.hashSync(content, salt);
};

/**
 * 验证是否正确
 */
exports.vertify = (content, hash) => {
  return bcrypt.compareSync(content, hash);
};
