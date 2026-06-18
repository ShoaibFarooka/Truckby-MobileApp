const yup = require('yup');
const mongoose = require('mongoose');

const ObjectId = yup.string()
  .nullable()
  .transform((value, originalValue) => (originalValue === '' ? null : value))
  .test('is-valid', 'Invalid user ID', function (value) {
    if (value === null || value === undefined) return true; // allow missing userId
    return mongoose.Types.ObjectId.isValid(value);
  });


const transformToNull = (value, originalValue) => originalValue === '' ? null : value;

const truckSchema = yup.object().shape({
  userId: ObjectId.optional(),

  // Basic Equipment Info
  vehicleName: yup.string().trim().required('Vehicle name is required'),
  vehiclePrice: yup.number()
    .transform(transformToNull)
    .typeError('Vehicle price must be a number')
    .required('Vehicle price is required'),
  truckCategory: yup.string().trim().required('Equipment category is required'),
  truckSubCategory: yup.string().trim().required('Equipment subcategory is required'),
  listingType: yup.string().trim().required('Listing type is required'),
  country: yup.string().trim().required('Country is required'),
  state: yup.string().trim().optional(),
  images: yup.array().of(yup.string().trim()).optional(),

  // Seller Contact Info
  name: yup.string().trim().required('Seller name is required'),
  phone: yup.number()
    .transform(transformToNull)
    .typeError('Phone number must be a number')
    .required('Phone number is required'),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  companyName: yup.string().trim().optional(),
  address: yup.string().trim().optional(),

  // Specifications
  modelYear: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Model year must be a number')
    .optional(),
  mileage: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Mileage must be a number')
    .optional(),
  vehicleManufacturer: yup.string().trim().optional(),
  hours: yup.string().trim().optional(),
  vin: yup.string().trim().optional(),
  model: yup.string().trim().required('Model is required'),
  unitNumber: yup.string().trim().optional(),
  condition: yup.string().trim()
    .oneOf(['New', 'Used', 'Salvaged'], 'Invalid condition')
    .optional(),

  // Body & Chassis
  wheelbase: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Wheelbase must be a number')
    .optional(),
  steering: yup.string().trim().optional(),
  suspension: yup.string().trim().optional(),
  engineManufacturer: yup.string().trim().optional(),
  color: yup.string().trim().optional(),
  engineModel: yup.string().trim().optional(),
  hoursPower: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Horsepower must be a number')
    .optional(),
  description: yup.string().trim().optional(),

  // Transmission
  transmissionType: yup.string().trim().optional(),
  noofSpeeds: yup.string().trim().optional(),
  transmissionManufacturer: yup.string().trim().optional(),
  typeofRearAxles: yup.string().trim().optional(),

  // Axles
  frontAxleWeight: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Front axle weight must be a number')
    .optional(),
  backAxleWeight: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Back axle weight must be a number')
    .optional(),
  grossVehicleWeight: yup.number()
    .transform(transformToNull)
    .nullable()
    .typeError('Gross vehicle weight must be a number')
    .optional(),
});

module.exports = {
  truckSchema
};
