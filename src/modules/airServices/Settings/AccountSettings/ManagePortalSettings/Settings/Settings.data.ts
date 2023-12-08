import * as Yup from 'yup';

export const settingsValidationSchema = Yup?.object()?.shape({
  portalName: Yup?.string(),
  portalURL: Yup?.string(),
  dateFormat: Yup?.string(),
  timeFormat: Yup?.string(),
  primaryLanguage: Yup?.string(),
  cartLogin: Yup?.boolean(),
  passwordPolicy: Yup?.boolean(),
  googleLogin: Yup?.boolean(),
  sSOLogin: Yup?.boolean(),
  sessionTimeout: Yup?.boolean(),
  publicURLS: Yup?.boolean(),
  adminNotification: Yup?.string(),
  time: Yup?.number(),
  days: Yup?.string(),
});

export const settingsDefaultValues = {
  portalName: '',
  portalURL: '',
  dateFormat: '',
  timeFormat: '',
  primaryLanguage: '',
  cartLogin: false,
  passwordPolicy: false,
  googleLogin: false,
  sSOLogin: false,
  sessionTimeout: false,
  publicURLS: false,
  adminNotification: '',
  time: 0,
  days: '',
};
