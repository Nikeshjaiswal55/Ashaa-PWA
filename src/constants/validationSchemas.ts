// Centralized Yup validation schemas for all forms
import * as Yup from 'yup';

// Welcome/Login form validation
export const welcomeValidationSchema = Yup.object({
  email: Yup.string()
    .test('is-valid', 'Enter a valid 10-digit mobile number or a valid email address', (value) => {
      const isPhone = /^\d{10}$/.test(value || '');
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
      return isPhone || isEmail;
    })
    .required('This field is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Change Password form validation
export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Farm Details (stepper) validation schemas
export const farmDetailsValidationSchemas = [
  Yup.object().shape({
    individualFarmSize: Yup.string().required('Farm size is required'),
    farmSizeUnit: Yup.string().required('Unit is required'),
    farmLocation: Yup.string().required('Farm location is required'),
    khasraNumber: Yup.string().required('Khasra/Survey number is required'),
    landOwnership: Yup.string().required('Land ownership is required'),
    ownerName: Yup.string().required('Owner name is required'),
    topography: Yup.string().required('Topography is required'),
  }),
  Yup.object().shape({
    irrigationMethod: Yup.string().required('Irrigation method is required'),
    hasKCC: Yup.boolean().required(),
    loanApproved: Yup.boolean().required(),
    laborAvailability: Yup.string().required('Labor availability is required'),
    hiredLaborPayment: Yup.string().when('laborAvailability', {
      is: 'Hired',
      then: (schema) => schema.required('Hired labor payment is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    farmingApproach: Yup.string().required('Farming approach is required'),
    croppingPattern: Yup.string().required('Cropping pattern is required'),
    primaryMarket: Yup.string().required('Primary market is required'),
  }),
  Yup.object().shape({
    soilType: Yup.string().required('Soil type is required'),
    soilTestingReportAvailable: Yup.boolean().required(),
    soilTestingReport: Yup.mixed().when('soilTestingReportAvailable', {
      is: true,
      then: (schema) => schema.required('Soil testing report is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  Yup.object().shape({
    waterSource: Yup.array().min(1, 'At least one water source is required'),
    waterSourcePhoto: Yup.mixed().required('Water source photo is required'),
    waterRetentionCapacity: Yup.string().required('Water retention capacity is required'),
    drainageQuality: Yup.string().required('Drainage quality is required'),
  }),
  Yup.object().shape({}),
  Yup.object().shape({
    cultivationArea: Yup.string().required('Cultivation Area is required'),
    cropName: Yup.string().required('Crop Name is required'),
    cropVariety: Yup.string().required('Crop Variety is required'),
    seedSource: Yup.array().min(1, 'At least one seed source is required'),
    seedingRate: Yup.number()
      .typeError('Seeding Rate must be a number')
      .required('Seeding Rate is required')
      .positive('Seeding Rate must be positive'),
    seedingRateUnit: Yup.string().required('Unit is required'),
    seedName: Yup.string().required('Seed Name is required'),
  }),
  Yup.object().shape({
    fertilizerName: Yup.string().required('Fertilizer Name is required'),
    fertilizerType: Yup.string().required('Fertilizer Type is required'),
    quantity: Yup.number()
      .typeError('Quantity must be a number')
      .required('Quantity is required')
      .positive('Quantity must be positive'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required')
      .positive('Price must be positive'),
    companyName: Yup.string().required('Company Name is required'),
    appliedRate: Yup.string().required('Applied Rate is required'),
    appliedStage: Yup.string().required('Applied Stage is required'),
  }),
  Yup.object().shape({
    pesticidesName: Yup.string().required('Pesticides Name is required'),
    pesticidesType: Yup.string().required('Pesticides Type is required'),
    pesticidesQuantity: Yup.number()
      .typeError('Quantity must be a number')
      .required('Quantity is required')
      .positive('Quantity must be positive'),
    pesticidesprice: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required')
      .positive('Price must be positive'),
    pesticidescompanyName: Yup.string().required('Company Name is required'),
    pesticidesappliedRate: Yup.string().required('Applied Rate is required'),
    pesticidesappliedStage: Yup.string().required('Applied Stage is required'),
  }),
];

// Farmer Details (stepper) validation schemas
export const farmerDetailsValidationSchemas = [
  Yup.object().shape({
    farmerName: Yup.string().required("Farmer's full name is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
      .required('Contact number is required'),
    aadharCardNumber: Yup.string()
      .matches(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/, 'Enter a valid Aadhar number (XXXX-XXXX-XXXX)')
      .required('Aadhar card number is required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female', 'Other'] as const)
      .required('Gender is required'),
    totalFarmSize: Yup.number()
      .typeError('Farm size must be a number')
      .positive('Farm size must be positive')
      .required('Total farm size is required'),
    farmSizeUnit: Yup.string()
      .oneOf(['Acre', 'Hectare', 'Bigha'] as const)
      .required('Unit is required'),
    separateFarms: Yup.number()
      .typeError('Number of farms must be a number')
      .integer('Must be an integer')
      .min(0, 'Cannot be negative')
      .required('Number of separate farms is required'),
    currentLocation: Yup.string().required('Current Location is required'),
    yearsOfExperience: Yup.number()
      .typeError('Must be a number')
      .required('This field is required')
      .min(0, 'Experience cannot be negative')
      .max(100, 'Too much experience'),
    // state: Yup.string().required('State is required'),
    // district: Yup.string().required('District is required'),
    // subDistrict: Yup.string().required('Sub-District/Block is required'),
    // pinCode: Yup.string()
    //   .matches(/^[0-9]{6}$/, 'Enter a valid 6-digit pin code')
    //   .required('Pin code is required'),
    // village: Yup.string().required('Village is required'),
    // farmerPhoto: Yup.mixed().nullable(), // Allow null, add .required() if mandatory
  }),
  Yup.object().shape({
    awards: Yup.string(),
    Certification: Yup.string().max(100, 'Too long').nullable(),
    // CertificateImage: Yup.mixed().nullable(), // Allow null, add .required() if mandatory
  }),
  Yup.object().shape({
    animalType: Yup.string().required('Required'),
    quantity: Yup.number().required('Required'),
    milkProduction: Yup.number().required('Required'),
    milkSellingPlace: Yup.string().required('Required'),
    breedName: Yup.string().required('Required'),
    insuranceAvailable: Yup.boolean().required('Required'),
    insuranceCompany: Yup.string().when('insuranceAvailable', {
      is: true,
      then: (schema) => schema.required('Required'),
    }),
  }),
  Yup.object().shape({
    storageType: Yup.string().required('Storage Facilities Type is required'),
    warehouseName: Yup.string().required('Warehouse Name is required'),
    warehouseLocation: Yup.string().required('Warehouse Location is required'),
    capacity: Yup.number()
      .typeError('Capacity must be a number')
      .required('Capacity is required')
      .min(1, 'Minimum 1 required'),
    capacityUnit: Yup.string().required('Unit is required'),
    condition: Yup.string().oneOf(['Good', 'Moderate', 'Poor']).required('Condition is required'),
  }),
  Yup.object().shape({
    equipment: Yup.string().required('Required'),
    equipmentQuantity: Yup.number().min(1, 'Minimum 1').required('Required'),
    equipmentType: Yup.string().required('Required'),
    brandName: Yup.string().required('Required'),
    owner: Yup.string().required('Required'),
    cheak: Yup.string().oneOf(['Good', 'Moderate', 'Poor']).required('Required'),
    onRent: Yup.boolean().required('Required'),
    // equipmentDocument: Yup.mixed().nullable(),
  }),
  Yup.object().shape({
    smartphoneOwnership: Yup.boolean().required('Required'),
    internetAccess: Yup.string().required('Please select internet access'),
    ownedBy: Yup.string().required('Please select owner'),
    farmSoftwareUsed: Yup.boolean().required('Required'),
    appName: Yup.string().when('farmSoftwareUsed', {
      is: true,
      then: (schema) => schema.required('App Name is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
];
