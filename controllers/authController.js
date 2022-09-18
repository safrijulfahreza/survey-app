const UserModel = require('../models/user.model');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function auth(req, res) {
  let error = validationResult(req);
  if (error && error.errors.length) {
    return res.status(401).json({ message: 'invalid login', error: [...error.errors] });
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).lean();

  //** validate user */
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const payloadToken = {
        name: `${user.first_name} ${user.last_name}`,
      };
      const token = jwt.sign(payloadToken, process.env.SECRET_KEY);
      res.status(200).json({ message: 'success', token });
    } else {
      res.status(401).json({ message: 'invalid login' });
    }
  } else {
    res.status(401).json({ message: 'invalid login' });
  }
}

module.exports = auth;
