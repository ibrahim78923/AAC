import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const placeRequestValidationSchema = Yup?.object()?.shape({
  requestor: Yup?.string()?.required('Field is Required'),
  requestorFor: Yup?.string()?.required('Field is Required'),
});
export const placeRequestDefaultValues = {
  requestor: '',
  requestorFor: '',
};
export const placeRequest = [
  {
    componentProps: {
      name: 'requestor',
      label: 'Requestor',
      fullWidth: true,
      require: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'requestForSomeOneElse',
      label: 'Request For Someone else',
      sx: { mb: 4 },
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'requestorFor',
      label: 'Requestor for',
      fullWidth: true,
      require: true,
    },
    component: RHFTextField,
    shouldDisplay: ({ getValues }: any) => getValues('requestForSomeOneElse'),
    md: 12,
  },
];
