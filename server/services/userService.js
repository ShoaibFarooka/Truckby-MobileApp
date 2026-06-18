const User = require("../models/userModel");
const CryptoJS = require('crypto-js')
const authUtils = require('../utils/authUtils');

const createUser = async (userData, role) => {
  const { name, email, userName, image, gender, city, country, state, password, userId, phone, companyName } = userData;
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('A user with that email has already been registered!');
    error.code = 409;
    throw error;
  }

  let passwordDigest = await authUtils.hashPassword(password);

  let user;

  if (role === 'user') {
    user = await User.create({
      email,
      password: passwordDigest,
      image,
      role,
      userId,
      userName
    });
  } else {
    user = await User.create({
      name,
      email,
      userName,
      image,
      gender,
      city,
      country,
      state,
      password: passwordDigest,
      role,
      userId,
      phone,
      companyName
    });
  }

  return user;
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  let passwordMatched = await authUtils.comparePassword(user.password, password);
  if (!passwordMatched) {
    const error = new Error('Invalid credentials!');
    error.code = 400;
    throw error;
  }
  let payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  let accessToken = authUtils.createAccessToken(payload);
  let refreshToken = authUtils.createRefreshToken(payload);
  user.refreshToken = refreshToken;
  await user.save();

  const safeUser = {
    _id: user._id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    role: user.role,
    image: user.image,
    city: user.city,
    state: user.state || null,
    country: user.country,
    phone: user.phone || null,
    companyName: user.companyName || null,
    gender: user.gender,
  };

  return { accessToken, refreshToken, user: safeUser };
};

const createResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  const randomBytes = CryptoJS.lib.WordArray.random(32);
  const resetToken = randomBytes.toString(CryptoJS.enc.Hex);
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
  await user.save();
  return { user, resetToken };
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) {
    const error = new Error('Invalid or expired token!');
    error.code = 400;
    throw error;
  }
  let passwordDigest = await authUtils.hashPassword(newPassword);
  user.password = passwordDigest;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error('Refresh token not found!');
    error.code = 401;
    throw error;
  }
  const payload = authUtils.verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.id);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error('Invalid refresh token!');
    error.code = 401;
    throw error;
  }
  const newPayload = { id: payload.id, email: payload.email, role: payload.role };
  const newAccessToken = authUtils.createAccessToken(newPayload);
  const newRefreshToken = authUtils.createRefreshToken(newPayload);
  user.refreshToken = newRefreshToken;
  await user.save();

  const safeUser = {
    _id: user._id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    role: user.role,
    image: user.image,
    city: user.city,
    state: user.state || null,
    country: user.country,
    phone: user.phone || null,
    companyName: user.companyName || null,
    gender: user.gender,
  };

  return { newAccessToken, newRefreshToken, user: safeUser };
};

const logoutUser = async (refreshToken) => {
  const payload = authUtils.verifyRefreshToken(refreshToken);
  if (payload && payload.id) {
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
};

const fetchUser = async (userId) => {
  const userProjection = {
    name: 1,
    email: 1,
    userName: 1,
    gender: 1,
    city: 1,
    image: 1,
    country: 1,
    state: 1,
    role: 1,
    _id: 1,
    phone: 1,
    companyName: 1,
  };
  const user = await User.findById(userId, userProjection);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const userToUpdate = await User.findById(userId);

  if (!userToUpdate) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }

  if (updateData.password) {
    updateData.password = await authUtils.hashPassword(updateData.password);
  }

  let existingUser;
  if (updateData.email && updateData.email !== userToUpdate.email) {
    existingUser = await User.findOne({ email: updateData.email });
    if (existingUser) {
      const error = new Error('A user with that email has already been registered!');
      error.code = 409;
      throw error;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true }
  );

  return updatedUser;
};

const deleteUser = async (userId, role) => {
  const userToDelete = await User.findById(userId);

  if (!userToDelete) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  if (!userToDelete.role === role) {
    const error = new Error('Cannot delete other type of user via this endpoint!');
    error.code = 405;
    throw error;
  }
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  let passwordMatched = await authUtils.comparePassword(user.password, oldPassword);
  if (!passwordMatched) {
    const error = new Error('Invalid old password!');
    error.code = 400;
    throw error;
  }
  let passwordDigest = await authUtils.hashPassword(newPassword);
  user.password = passwordDigest;
  await user.save();
};

const fetchUserStripeCustomerId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }
  else {
    return null;
  }
};

module.exports = {
  createUser,
  loginUser,
  createResetToken,
  resetPassword,
  refreshToken,
  logoutUser,
  fetchUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  fetchUserStripeCustomerId,
};
