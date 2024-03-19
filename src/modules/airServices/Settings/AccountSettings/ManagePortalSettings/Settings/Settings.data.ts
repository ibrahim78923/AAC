import * as Yup from 'yup';

export const settingsValidationSchema = Yup?.object()?.shape({
  portalName: Yup?.string(),
  portalURL: Yup?.string(),
  dateFormat: Yup?.string(),
  timeFormat: Yup?.string(),
  primaryLanguage: Yup?.string(),
});

export const settingsDefaultValues = {
  portalName: '',
  portalURL: '',
  dateFormat: '',
  timeFormat: '',
  primaryLanguage: '',
};
