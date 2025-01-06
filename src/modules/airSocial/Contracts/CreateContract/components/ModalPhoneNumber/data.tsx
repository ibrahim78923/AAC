import * as Yup from 'yup';

const phoneRegex = /^\+\d{1,3}[-.\s]?\d{10,}$/;

export const validationSchema = (activeStep: number) => {
  return Yup?.object()?.shape({
    phoneNumber:
      activeStep === 0
        ? Yup.string()
            .required('Field is required') // Show message if empty
            .matches(phoneRegex, 'Invalid phone number') // Show message if invalid
        : Yup.string().nullable(), // No validation for other steps

    verificationCode:
      activeStep === 1
        ? Yup.string()
            .required('Verification code is required') // Show message if empty
            .matches(/^\d{6}$/, 'Verification code must be 6 digits') // Must be 6 digits
        : Yup.string().nullable(), // No validation for other steps
  });
};

// Define your default values
export const defaultValues = {
  phoneNumber: '',
  verificationCode: '',
};
