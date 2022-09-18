const jwt = require('jsonwebtoken');

const authUserLogin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: err.message });
    next();
  });
};

module.exports = { authUserLogin };
