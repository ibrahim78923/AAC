import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';
import * as Yup from 'yup';
export const placeRequestValidationSchema = Yup?.object()?.shape({
  requestor: Yup?.string()?.required('Required'),
  requestorFor: Yup?.string()?.required('Required'),
  noOfItem: Yup?.number(),
});
export const placeRequestDefaultValues = {
  requestor: '',
  requestorFor: '',
};

export const placeRequest = [
  {
    componentProps: {
      name: 'noOfItem ',
      label: 'No of item',
      fullWidth: true,
      required: true,
      type: 'number',
    },
    shouldDisplay: ({ other: { serviceId } }: any) =>
      serviceId === CATALOG_SERVICE_TYPES?.HARDWARE,
    component: RHFTextField,
    md: 3,
  },
  {
    componentProps: {
      name: 'requestor',
      label: 'Requestor',
      fullWidth: true,
      required: true,
      placeholder: 'Enter name or email',
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'requestForSomeOneElse',
      label: 'Request For Someone else',
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'requestorFor',
      label: 'Requestor for',
      fullWidth: true,
      required: true,
      placeholder: 'Enter name or email',
    },
    component: RHFTextField,
    shouldDisplay: ({ getValues }: any) => getValues('requestForSomeOneElse'),
    md: 12,
  },
];
