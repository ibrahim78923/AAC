import * as Yup from 'yup';
export const moveToCategoryValidationSchema = Yup?.object()?.shape({
  category: Yup?.string(),
});
export const moveToCategoryDefaultValues = {
  category: '',
};
export const moveToCategoryOption = [
  {
    value: 'hardWareProvisioning',
    label: 'HardWare Provisioning',
  },
];
