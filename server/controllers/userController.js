const path = require('path');
const userService = require('../services/userService');
const emailService = require('../services/emailService');
const templateUtils = require('../utils/templateUtils');

const Register = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { userType } = req.params;
    const user = await userService.createUser(data, userType);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error)
  }
};

const Login = async (req, res, next) => {
  try {
    const clientType = req.headers['x-client-type'];
    const data = { ...req.body };
    const { accessToken, refreshToken, user } = await userService.loginUser(data);
    if (clientType === "native") {
      res.status(200).json({ accessToken, refreshToken, user });
    } else {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      });
      res.status(200).json({ token: accessToken });
    }
  } catch (error) {
    next(error);
  }
};

const ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { user, resetToken } = await userService.createResetToken(email);
    const CLIENT_URL = req.get('origin');
    const resetLink = `${CLIENT_URL}/reset-password?token=${resetToken}`;
    const templatePath = path.join(__dirname, '../templates/resetPasswordEmailTemplate.hbs');
    const data = {
      companyLogo: "http://localhost:5778/static/images/logo.png",
      userName: user.name,
      resetLink
    };
    const htmlContent = await templateUtils.generateHTML(data, templatePath);
    await emailService.sendEmail(user.email, 'Password Reset Request', null, htmlContent);
    res.status(200).json({ message: 'Reset password link sent!' });
  } catch (error) {
    next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const RefreshToken = async (req, res, next) => {
  try {
    const clientType = req.headers['x-client-type'];
    const refreshToken = clientType === "native" ? req.body?.refreshToken : req.cookies?.refreshToken;
    const { newAccessToken, newRefreshToken, user } = await userService.refreshToken(refreshToken);

    if (clientType === "native") {
      return res.status(200).json({ newAccessToken, newRefreshToken, user });
    }

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

const Logout = async (req, res, next) => {
  try {
    const clientType = req.headers['x-client-type'];
    const refreshToken = clientType === "native" ? req.body?.refreshToken : req.cookies?.refreshToken;

    if (refreshToken) {
      await userService.logoutUser(refreshToken);
    }

    if (clientType !== "native") {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const FetchUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await userService.fetchUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const UpdateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const user = await userService.updateUser(userId, data);
    res.status(200).json({ message: "Info updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const ChangeUserPassword = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.body;
    await userService.changeUserPassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  RefreshToken,
  Logout,
  FetchUserInfo,
  UpdateUserInfo,
  ChangeUserPassword
};
