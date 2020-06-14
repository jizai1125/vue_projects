const jwt = require('jsonwebtoken');
// jwt密钥
const secret = 'my_token';
// 过期时间
const expiresIn = '24h';

function getToken(payload = {}) {
  return jwt.sign(payload, secret, { expiresIn });
}

/* 通过token获取JWT的payload部分 */
function getJWTPayload(authorization) {
  const token = authorization.split(' ')[1];
  // 验证并解析JWT
  return jwt.verify(token, secret);
}

module.exports = {
  secret,
  getToken,
  getJWTPayload,
};
