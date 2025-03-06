import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  signingOrder: Yup?.string()?.trim(),
  onBehalfOf: Yup?.mixed().nullable(),
  personalTitle: Yup?.string()?.trim(),
  fullName: Yup?.string(),
  email: Yup?.string()?.trim(),
});

export const defaultValues = {
  signingOrder: 1,
  onBehalfOf: null,
  personalTitle: '',
  signeeName: '',
  signeeEmail: '',
};
