import * as Yup from 'yup';
export const moveToCategoryValidationSchema = Yup?.object()?.shape({
  category: Yup?.mixed()?.nullable(),
});
export const moveToCategoryDefaultValues = {
  category: null,
};
export const moveToCategoryOption = ['HardWare Provisioning'];
