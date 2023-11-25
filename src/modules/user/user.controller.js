const path = require('path');
const { generateAccessToken } = require(path.join(process.cwd(), '/src/modules/user/user.service.js'));
const { asyncHandler, AppError } = require(path.join(process.cwd(), 'src/modules/core/errors'));
const User = require('./user.model');

const signup = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return next(new AppError(400, 'User already exists!'));
  }
  const registeredUser = await User.create({ username, password });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user: registeredUser,
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError(400, 'Please provide both values'));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError(401, 'Invalid credentials'));
  }
  if (!(await user.comparePassword(password))) {
    return next(new AppError(401, 'Invalid username or password'));
  }

  const accessToken = generateAccessToken(user);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    signed: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully!',
    data: {
      user,
      accessToken,
    },
  });
});

module.exports = {
  signup,
  login,
};
