const yup = require('yup');
const mongoose = require('mongoose');

const ObjectId = yup.string().test('is-valid', 'Invalid user ID', value => mongoose.Types.ObjectId.isValid(value));

const registerSchema = yup.object().shape({
  name: yup.string().trim().optional(),
  userName: yup.string().trim().optional(),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  password: yup.string().trim().required('Password is required'),
  city: yup.string().trim().optional(),
  country: yup.string().trim().optional(),
  state: yup.string().trim().optional(),
  gender: yup.string().trim().optional(),
  image: yup.string().trim().optional(),
  role: yup.string().trim().optional(),
  phone: yup.number(),
  companyName: yup.string().trim().optional(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
});

const userTypeSchema = yup.object().shape({
  userType: yup.string().oneOf(['user', 'seller'], 'Invalid user type').required('User type is required')
});

const resetPasswordSchema = yup.object().shape({
  token: yup.string().trim().required('Token is required'),
  newPassword: yup.string().trim().required('New Password is required'),
});

const createUserSchema = yup.object().shape({
  name: yup.string().trim().optional(),
  userName: yup.string().trim().optional(),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  password: yup.string().trim().required('Password is required'),
  image: yup.string().trim().optional(),
  city: yup.string().trim().optional(),
  country: yup.string().trim().optional(),
  gender: yup.string().trim().optional(),
  role: yup.string().trim().optional(),
  phone: yup.number(),
  companyName: yup.string().trim().optional(),
});

const updateUserSchema = yup.object().shape({
  name: yup.string().trim().optional(),
  userName: yup.string().trim().optional(),
  email: yup.string().trim().email('Invalid email address').optional(),
  password: yup.string().trim().optional(),
  image: yup.string().trim().optional(),
  city: yup.string().trim().optional(),
  country: yup.string().trim().optional(),
  state: yup.string().trim().optional(),
  gender: yup.string().trim().optional(),
  role: yup.string().trim().optional(),
  phone: yup.number(),
  companyName: yup.string().trim().optional(),
});

const userIdSchema = yup.object().shape({
  userId: ObjectId.required('User ID is required'),
});

const searchUsersSchema = yup.object().shape({
  pageIndex: yup.number().required('Page index is required'),
  limit: yup.number().positive('Limit must be positive').required('Limit is required'),
  searchQuery: yup.string().trim(),
  status: yup.string().trim(),

});

const changeUserPasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required('Old Password is required'),
  newPassword: yup.string().trim().required('New Password is required'),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userTypeSchema,
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  searchUsersSchema,
  changeUserPasswordSchema
};
